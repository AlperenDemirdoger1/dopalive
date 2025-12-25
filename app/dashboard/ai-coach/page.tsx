'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Message, ToolType } from '@/lib/chat/types';
import { createMessage } from '@/lib/chat/utils';
import { useProactiveNudge } from '@/lib/chat/hooks';
import { MessageList } from '@/components/chat/MessageList';
import { QuickActions } from '@/components/chat/QuickActions';
import { ChatInput } from '@/components/chat/ChatInput';
import { NudgeOverlay } from '@/components/chat/NudgeOverlay';
import { DashboardLayout } from '@/components/dashboard';
import { 
  Timer,
  ListTodo,
  Calendar,
} from 'lucide-react';

/**
 * AI Coach Full Page
 * 
 * Full-screen chat experience within dashboard layout
 * ADHD-friendly design with:
 * - Clean, focused interface
 * - Quick action shortcuts
 * - Welcoming onboarding
 * - Smooth animations
 */

export default function AICoachPage() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showWelcome, setShowWelcome] = React.useState(true);
  
  // Proactive nudge system
  const { currentNudge, dismissNudge, updateActivity } = useProactiveNudge({
    idleTimeout: 5 * 60 * 1000,
    enabled: true,
  });
  
  const handleSend = async (content: string) => {
    setShowWelcome(false);
    updateActivity();
    
    const userMessage = createMessage('user', content);
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Demo response for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      const demoResponse = getDemoResponse(content);
      const assistantMessage = createMessage('assistant', demoResponse);
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = createMessage('system', 'Bir hata oluştu. Lütfen tekrar dene.');
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleQuickAction = (toolType: ToolType, prompt: string) => {
    dismissNudge();
    handleSend(prompt);
  };
  
  const handleNudgeAction = (toolType?: ToolType) => {
    dismissNudge();
    if (toolType) {
      const prompts: Record<ToolType, string> = {
        pomodoro: 'Bir pomodoro seansı başlatalım',
        task_breakdown: 'Görevimi parçalamama yardım et',
        daily_plan: 'Bugün için plan yapalım',
        reminder: 'Bir hatırlatıcı kuralım',
      };
      handleSend(prompts[toolType]);
    }
  };
  
  const handleWelcomeAction = (action: string) => {
    setShowWelcome(false);
    handleSend(action);
  };
  
  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-64px)] lg:h-screen flex flex-col -mx-5 md:-mx-8 -my-6">
        {/* Chat Header */}
        <div className="flex items-center gap-3 px-4 md:px-6 py-4 border-b border-border bg-background/95 backdrop-blur-xl">
          <div className="w-10 h-10 rounded-full bg-gradient-warm flex items-center justify-center shadow-warm-sm">
            <span className="text-white font-bold font-display text-lg">D</span>
          </div>
          <div>
            <h1 className="font-semibold text-foreground font-display">Dopa</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              DEHB Koçun
            </p>
          </div>
        </div>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full overflow-y-auto">
        {/* Welcome Screen */}
        {showWelcome && messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col items-center justify-center p-6 text-center"
          >
              {/* Avatar */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-gradient-warm flex items-center justify-center shadow-warm-lg mb-6"
              >
                <span className="text-white font-bold font-display text-3xl">D</span>
              </motion.div>
              
              {/* Welcome Text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-foreground font-display mb-2">
                  Merhaba! Ben Dopa 👋
                </h2>
                <p className="text-muted-foreground max-w-md mb-8">
                  DEHB koçun olarak yanındayım. Odaklanma, görevleri parçalama ve 
                  günlük planlama konusunda yardımcı olabilirim.
                </p>
              </motion.div>
              
              {/* Quick Start Actions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full max-w-sm space-y-3"
              >
                <p className="text-sm font-medium text-muted-foreground mb-4">
                  ŞUNLARLA BAŞLAYABİLİRSİN:
                </p>
                
                <button
                  onClick={() => handleWelcomeAction('Bir pomodoro seansı başlatalım')}
                  className="w-full p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 flex items-center gap-3 text-left group"
                >
                  <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <Timer className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      🍅 Pomodoro başlat
                    </p>
                    <p className="text-xs text-muted-foreground">25 dakika odaklan</p>
                  </div>
                </button>
                
                <button
                  onClick={() => handleWelcomeAction('Bir görevi küçük adımlara bölmeme yardım et')}
                  className="w-full p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 flex items-center gap-3 text-left group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <ListTodo className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      📋 Bir görevi parçala
                    </p>
                    <p className="text-xs text-muted-foreground">Büyük görevleri küçük adımlara böl</p>
                  </div>
                </button>
                
                <button
                  onClick={() => handleWelcomeAction('Bugün için bir plan yapalım')}
                  className="w-full p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 flex items-center gap-3 text-left group"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      📅 Günümü planla
                    </p>
                    <p className="text-xs text-muted-foreground">Gününü organize et</p>
                  </div>
                </button>
              </motion.div>
          </motion.div>
        )}
        
        {/* Messages */}
        {(!showWelcome || messages.length > 0) && (
          <MessageList
            messages={messages}
            isLoading={isLoading}
            className="flex-1"
          />
        )}
        
        {/* Proactive Nudge */}
        <NudgeOverlay
          nudge={currentNudge}
          onDismiss={dismissNudge}
          onAction={handleNudgeAction}
        />
      </main>

        {/* Bottom Input Area */}
        <div className="bg-background border-t border-border">
          <div className="max-w-3xl mx-auto w-full">
            {/* Quick Actions */}
            <QuickActions
              onAction={handleQuickAction}
              disabled={isLoading}
            />
            
            {/* Input */}
            <ChatInput
              onSend={handleSend}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

/**
 * Demo response generator
 */
function getDemoResponse(input: string): string {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('pomodoro') || lowerInput.includes('odak')) {
    return `Harika! 🍅 Bir pomodoro seansı başlatalım.

• 25 dakika derin çalışma
• 5 dakika mola
• Sonra tekrar!

Hangi görev üzerinde çalışmak istiyorsun?`;
  }
  
  if (lowerInput.includes('parçala') || lowerInput.includes('böl') || lowerInput.includes('adım')) {
    return `Tabii! Görevi parçalayalım. 📋

Hangi görevi küçük adımlara bölmek istiyorsun? 

Bana görevi anlat, birlikte 3-5 yapılabilir adıma bölelim.`;
  }
  
  if (lowerInput.includes('plan') || lowerInput.includes('gün')) {
    return `Gününü planlayalım! 📅

• Önce bugün en önemli 3 şeyi belirleyelim
• Sonra bunları zaman bloklarına yerleştirelim

Bugün mutlaka yapman gereken şeyler neler?`;
  }
  
  if (lowerInput.includes('hatırlatıcı') || lowerInput.includes('hatırlat')) {
    return `Hatırlatıcı kuralım! 🔔

Ne hakkında hatırlatmamı istersin ve ne zaman?

Örnek: "Yarın saat 10'da toplantı hatırlat"`;
  }
  
  return `Anladım! 👋

Sana nasıl yardımcı olabilirim?

• **Pomodoro** ile odaklanabilirsin
• **Görev parçalama** ile büyük işleri küçültebilirsin
• **Gün planı** ile organize olabilirsin

Ne yapmak istersin?`;
}

