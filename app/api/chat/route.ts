/**
 * DopaLive Chat API Route
 * 
 * Handles chat requests using Google Vertex AI (Gemini)
 * Supports streaming responses for real-time chat experience
 */

import { NextRequest, NextResponse } from 'next/server';
import { DOPALIVE_SYSTEM_PROMPT } from '@/lib/chat/prompts';

/**
 * Vertex AI configuration
 * 
 * Note: In production, use @google-cloud/vertexai package
 * For development, we use Google AI Studio API (Gemini)
 */
const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY;
const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  userId?: string;
  stream?: boolean;
}

/**
 * POST /api/chat
 * 
 * Send a message and get AI response
 */
export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { messages, userId, stream = false } = body;
    
    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      );
    }
    
    // Check for API key
    if (!GOOGLE_AI_API_KEY) {
      console.warn('GOOGLE_AI_API_KEY not set, using fallback response');
      return NextResponse.json({
        message: getFallbackResponse(messages[messages.length - 1].content),
      });
    }
    
    // Format messages for Gemini
    const formattedMessages = formatMessagesForGemini(messages);
    
    // Call Gemini API
    const response = await callGeminiAPI(formattedMessages, stream);
    
    if (stream) {
      // Return streaming response
      return new Response(response as ReadableStream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }
    
    return NextResponse.json({ message: response });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Format messages for Gemini API
 */
function formatMessagesForGemini(messages: ChatMessage[]): GeminiContent[] {
  const contents: GeminiContent[] = [];
  
  // Add system prompt as first user message (Gemini doesn't have system role)
  contents.push({
    role: 'user',
    parts: [{ text: DOPALIVE_SYSTEM_PROMPT }],
  });
  
  // Add acknowledgment
  contents.push({
    role: 'model',
    parts: [{ text: 'Anladım! DEHB koçu Dopa olarak yardımcı olmaya hazırım.' }],
  });
  
  // Add conversation messages
  for (const msg of messages) {
    if (msg.role === 'system') continue; // Skip system messages
    
    contents.push({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    });
  }
  
  return contents;
}

interface GeminiContent {
  role: 'user' | 'model';
  parts: { text: string }[];
}

/**
 * Call Gemini API
 */
async function callGeminiAPI(
  contents: GeminiContent[],
  stream: boolean = false
): Promise<string | ReadableStream> {
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:${stream ? 'streamGenerateContent' : 'generateContent'}?key=${GOOGLE_AI_API_KEY}`;
  
  const requestBody = {
    contents,
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    },
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
    ],
  };
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API error:', errorText);
    throw new Error(`Gemini API error: ${response.status}`);
  }
  
  if (stream) {
    // Return streaming response
    return createStreamFromResponse(response);
  }
  
  // Parse non-streaming response
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return text;
}

/**
 * Create SSE stream from Gemini streaming response
 */
function createStreamFromResponse(response: Response): ReadableStream {
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  
  return new ReadableStream({
    async start(controller) {
      if (!reader) {
        controller.close();
        return;
      }
      
      try {
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) {
            controller.enqueue(`data: {"type":"done"}\n\n`);
            controller.close();
            break;
          }
          
          const chunk = decoder.decode(value, { stream: true });
          
          // Parse streaming chunks
          const lines = chunk.split('\n').filter(line => line.trim());
          
          for (const line of lines) {
            try {
              const data = JSON.parse(line);
              const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
              
              if (text) {
                controller.enqueue(`data: {"type":"text","content":"${escapeJSON(text)}"}\n\n`);
              }
            } catch {
              // Ignore parse errors for partial chunks
            }
          }
        }
      } catch (error) {
        controller.enqueue(`data: {"type":"error","error":"Stream error"}\n\n`);
        controller.close();
      }
    },
  });
}

/**
 * Escape string for JSON
 */
function escapeJSON(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

/**
 * Fallback response when API is not available
 */
function getFallbackResponse(input: string): string {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('pomodoro') || lowerInput.includes('odak')) {
    return `Harika! 🍅 Bir pomodoro seansı başlatalım.

• 25 dakika derin çalışma
• 5 dakika mola

Hangi görev üzerinde çalışmak istiyorsun?

{"tool": "pomodoro", "params": {"duration": 25, "task": "Görev", "breakDuration": 5}}`;
  }
  
  if (lowerInput.includes('parçala') || lowerInput.includes('adım')) {
    return `Tabii! Görevi parçalayalım. 📋

Hangi görevi küçük adımlara bölmek istiyorsun?`;
  }
  
  if (lowerInput.includes('plan') || lowerInput.includes('gün')) {
    return `Gününü planlayalım! 📅

• Önce bugün en önemli 3 şeyi belirleyelim
• Sonra bunları zaman bloklarına yerleştirelim

Bugün mutlaka yapman gereken şeyler neler?`;
  }
  
  if (lowerInput.includes('hatırlatıcı') || lowerInput.includes('hatırlat')) {
    return `Hatırlatıcı kuralım! 🔔

Ne hakkında hatırlatmamı istersin ve ne zaman?`;
  }
  
  if (lowerInput.includes('merhaba') || lowerInput.includes('selam')) {
    return `Merhaba! 👋 Ben Dopa, DEHB koçun.

Bugün sana nasıl yardımcı olabilirim?

• 🍅 Pomodoro başlat
• 📋 Görev parçala  
• 📅 Gün planla
• 🔔 Hatırlatıcı kur`;
  }
  
  return `Anladım! 👋

Sana nasıl yardımcı olabilirim?

• Pomodoro başlatabilir
• Görevlerini parçalayabilir
• Gününü planlayabilir
• Hatırlatıcı kurabiliriz

Ne yapmak istersin?`;
}

