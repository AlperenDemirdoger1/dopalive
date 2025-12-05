// Blog Types and Sample Data

export interface Author {
  name: string;
  avatar: string;
  role: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  tags: string[];
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  coverImage: string;
  readingTime: number;
  featured?: boolean;
}

export type BlogCategory = 'advice' | 'case-studies' | 'research' | 'tools';

export const categoryLabels: Record<BlogCategory, string> = {
  'advice': 'Advice',
  'case-studies': 'Case Studies',
  'research': 'Research',
  'tools': 'Tools',
};

export const categoryColors: Record<BlogCategory, { bg: string; text: string; border: string }> = {
  'advice': { bg: 'bg-[#f5d4a0]/10', text: 'text-[#f5d4a0]', border: 'border-[#f5d4a0]/20' },
  'case-studies': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  'research': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  'tools': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
};

// Default authors
export const authors: Record<string, Author> = {
  'alex-rivera': {
    name: 'Alex Rivera',
    avatar: '/authors/alex.jpg',
    role: 'ADHD Coach & Founder',
  },
  'maya-chen': {
    name: 'Maya Chen',
    avatar: '/authors/maya.jpg',
    role: 'Neuroscience Researcher',
  },
  'jordan-park': {
    name: 'Jordan Park',
    avatar: '/authors/jordan.jpg',
    role: 'Product Designer',
  },
};

// Sample blog posts
export const blogPosts: BlogPost[] = [
  {
    slug: 'the-project-graveyard-phenomenon',
    title: 'The Project Graveyard Phenomenon',
    subtitle: 'Why ADHD Brains Collect Unfinished Dreams',
    excerpt: 'We\'ve all been there—that exciting rush when starting something new, followed by the quiet guilt of another abandoned project. Let\'s explore why this happens and how to break the cycle.',
    content: `
# The Project Graveyard Phenomenon

We've all been there—that exciting rush when starting something new, followed by the quiet guilt of another abandoned project. If you have ADHD, your "project graveyard" might be particularly crowded.

## The Dopamine Chase

When we start a new project, our brains flood with dopamine. Everything feels possible. The learning curve is exciting, and novelty keeps us engaged. But as the initial excitement fades and routine work sets in, our dopamine-seeking brains start looking for the next shiny thing.

### The Statistics Tell a Story

Research shows that adults with ADHD are:
- **3x more likely** to abandon projects before completion
- Often juggling **5+ unfinished projects** at any given time
- Prone to experiencing "hyperfocus burnout"

## Breaking the Cycle

The good news? Understanding this pattern is the first step to breaking it.

### 1. Embrace the "Minimum Viable Launch"

Instead of waiting for perfection, aim to ship something—anything—that works. A half-finished launched project beats a perfect abandoned one.

### 2. Build External Accountability

ADHD brains respond well to external structure. Find an accountability partner, join a pod, or use tools that create artificial deadlines.

### 3. Break Projects into Dopamine Hits

Large projects feel overwhelming. Break them into small, completable tasks that give you that satisfaction hit.

## The LaunchPod Approach

This is exactly why we built LaunchPod. Our AI coach helps you break projects into manageable pieces, while accountability pods provide the external motivation ADHD brains crave.

Remember: You're not lazy. Your brain is just wired differently. With the right tools and understanding, you can absolutely finish what you start.
    `,
    category: 'advice',
    tags: ['ADHD', 'productivity', 'project management', 'psychology'],
    author: authors['alex-rivera'],
    publishedAt: '2024-01-15',
    coverImage: '/blog/project-graveyard.jpg',
    readingTime: 6,
    featured: true,
  },
  {
    slug: 'how-sarah-shipped-her-first-app',
    title: 'How Sarah Shipped Her First App in 90 Days',
    subtitle: 'A Case Study in ADHD-Friendly Development',
    excerpt: 'After 4 years of unfinished side projects, Sarah finally launched her app using LaunchPod\'s accountability system. Here\'s her complete journey.',
    content: `
# How Sarah Shipped Her First App in 90 Days

Sarah had been trying to build her first app for four years. She had repositories full of half-finished projects, dozens of started tutorials, and a growing sense that maybe she just wasn't "meant" to be a developer.

## The Breaking Point

"I was diagnosed with ADHD at 32," Sarah shares. "Suddenly, all those abandoned projects made sense. It wasn't a character flaw—it was how my brain worked."

### The Pattern

Every project followed the same trajectory:
1. **Week 1-2**: Intense hyperfocus, building features rapidly
2. **Week 3-4**: Excitement fading, finding "bugs" to research
3. **Week 5+**: New project idea emerges, old one abandoned

## What Changed

Sarah joined LaunchPod's beta program in October. Here's what made the difference:

### Daily Check-ins

"Having to report to my pod every day changed everything. Even when I didn't feel like coding, knowing I'd have to explain myself kept me going."

### AI-Assisted Planning

"The AI coach helped me break my app into tiny pieces. Instead of 'build user authentication,' I had 'create login form with email field.' Suddenly it wasn't overwhelming."

### The 90-Day Timeline

Setting a hard deadline created the external pressure her brain needed.

## The Results

Sarah launched "FocusFlow" on January 15th:
- **2,500 users** in the first month
- **4.8 star rating** on the App Store
- Featured in ProductHunt's top 10

## Key Takeaways

1. External accountability beats internal motivation for ADHD
2. Small tasks create sustainable dopamine rewards
3. Hard deadlines work when they're public

Sarah is now working on her second app—this time with confidence.
    `,
    category: 'case-studies',
    tags: ['success story', 'app development', 'ADHD', 'accountability'],
    author: authors['alex-rivera'],
    publishedAt: '2024-01-10',
    coverImage: '/blog/sarah-case-study.jpg',
    readingTime: 8,
  },
  {
    slug: 'the-neuroscience-of-project-completion',
    title: 'The Neuroscience of Project Completion',
    subtitle: 'What Brain Science Tells Us About Finishing Things',
    excerpt: 'New research reveals why some brains struggle to finish projects—and what we can do about it. A deep dive into dopamine, executive function, and the completion circuit.',
    content: `
# The Neuroscience of Project Completion

Why do some people effortlessly finish projects while others struggle despite genuine effort? The answer lies in our brain chemistry.

## The Dopamine Completion Circuit

Recent neuroimaging studies have identified what researchers call the "completion circuit"—a network involving the prefrontal cortex, striatum, and nucleus accumbens.

### How It Works

1. **Goal Setting**: Prefrontal cortex encodes the goal
2. **Progress Tracking**: Striatum monitors advancement
3. **Reward Prediction**: Nucleus accumbens anticipates completion dopamine
4. **Completion**: Full circuit activation creates satisfaction

### The ADHD Difference

In ADHD brains, this circuit shows reduced activation—particularly in the reward prediction phase. Without strong anticipation of completion rewards, the brain seeks dopamine elsewhere.

## Key Research Findings

### Study: Stanford Neuroimaging Lab (2023)

Participants with ADHD showed:
- **40% reduced** striatum activation during sustained tasks
- **Higher activation** during novel task introduction
- **Normalized patterns** when external accountability was introduced

### Study: MIT Behavioral Economics (2023)

Breaking tasks into smaller units increased completion rates by:
- **67%** in participants with ADHD
- **23%** in neurotypical control group

## Practical Applications

### 1. Create Artificial Completion Points

Don't wait for the big finish. Celebrate small milestones explicitly.

### 2. External Progress Visibility

Make your progress visible to others. This activates social reward circuits that can compensate for reduced internal motivation.

### 3. Novelty Injection

Schedule "novelty breaks" to satisfy the brain's need for new stimuli without abandoning the project.

## The Future of ADHD Productivity

Understanding these mechanisms opens doors for targeted interventions. LaunchPod's approach is specifically designed around this research.
    `,
    category: 'research',
    tags: ['neuroscience', 'ADHD', 'dopamine', 'brain research'],
    author: authors['maya-chen'],
    publishedAt: '2024-01-05',
    coverImage: '/blog/neuroscience.jpg',
    readingTime: 10,
  },
  {
    slug: 'best-pomodoro-techniques-for-adhd',
    title: 'Best Pomodoro Techniques for ADHD',
    subtitle: 'Modified Timer Methods That Actually Work',
    excerpt: 'The traditional Pomodoro technique doesn\'t work for everyone. Here are five ADHD-specific modifications that leverage hyperfocus instead of fighting it.',
    content: `
# Best Pomodoro Techniques for ADHD

The traditional Pomodoro Technique—25 minutes of work, 5-minute break—was revolutionary for productivity. But for ADHD brains, it often falls flat. Here's why, and what to do instead.

## Why Standard Pomodoro Fails ADHD

### The Hyperfocus Problem

When you finally get into flow, the timer pulls you out. For ADHD brains that struggle to enter focus states, interrupting hyperfocus can be counterproductive.

### The Transition Tax

Every timer means a transition. ADHD brains pay a higher "transition tax"—the mental energy needed to switch contexts.

## ADHD-Modified Techniques

### 1. The Flexible Pomodoro (40/10)

- Work for **40 minutes** (or until natural break)
- Rest for **10 minutes**
- Fewer transitions, respects hyperfocus

### 2. The Body Double Pomodoro

Work alongside someone (even virtually) for the entire session. The social accountability maintains focus without relying solely on timers.

### 3. The Task-Based Sprint

Instead of time-based intervals:
- Define **1 small, completable task**
- Work until done
- Take a break based on task difficulty

### 4. The Reverse Pomodoro

Start with a 5-minute warm-up task. Once momentum builds, extend naturally. Use timers only to remind you to check in, not to stop.

### 5. The Gamified Pomodoro

Turn sessions into a game:
- Earn points per completed session
- Set daily/weekly targets
- Reward milestones

## LaunchPod's Smart Timer

Our AI-powered timer adapts to your natural focus patterns:
- Learns your optimal session length
- Suggests breaks based on focus metrics
- Never interrupts genuine hyperfocus

## Finding Your Method

There's no one-size-fits-all. Experiment with these techniques and track what works. Your optimal method might be completely unique.
    `,
    category: 'tools',
    tags: ['pomodoro', 'time management', 'ADHD', 'productivity tools'],
    author: authors['jordan-park'],
    publishedAt: '2024-01-01',
    coverImage: '/blog/pomodoro.jpg',
    readingTime: 7,
  },
  {
    slug: 'building-your-accountability-pod',
    title: 'Building Your Accountability Pod',
    subtitle: 'How to Find and Nurture Your Perfect Support Group',
    excerpt: 'Accountability partners are powerful, but pods are transformative. Learn how to build a support group that actually helps you ship.',
    content: `
# Building Your Accountability Pod

Solo accountability works for some. But for ADHD brains that thrive on social connection and variety, a pod—a small group of 3-5 people—can be transformative.

## Why Pods Beat Partners

### Multiple Perspectives

Different people notice different things. A diverse pod catches blind spots a single partner might miss.

### Reduced Dependency

If your one accountability partner is busy, you're on your own. Pods provide consistent coverage.

### Social Motivation

Reporting to a group activates stronger social accountability circuits than one-on-one check-ins.

## The Ideal Pod Composition

### Size: 3-5 People

- Fewer than 3: Not enough diversity
- More than 5: Coordination becomes unwieldy

### Shared but Not Identical Goals

You want people who understand your context but aren't direct competitors.

### Mixed Skill Levels

Having both beginners and veterans creates mentorship opportunities and fresh perspectives.

## Running Effective Pod Sessions

### Daily Async Check-ins

Quick updates in a shared channel:
- What did you complete?
- What's blocking you?
- What will you do today?

### Weekly Video Calls (30 min)

- Round-robin progress updates (5 min each)
- Problem-solving session (10 min)
- Goal setting for next week (5 min)

### Monthly Retrospectives

- What worked this month?
- What needs to change?
- Celebrate wins together

## Pod Anti-Patterns

### The Cheerleading Squad

Pods that only celebrate without challenging don't drive growth.

### The Comparison Trap

Focus on individual progress, not relative performance.

### The Ghost Pod

Inconsistent participation kills momentum. Set clear expectations upfront.

## LaunchPod Matching

Our algorithm considers:
- Project type and stage
- Time zone compatibility  
- Communication style preferences
- ADHD profile similarities

Find your pod. Ship your project.
    `,
    category: 'advice',
    tags: ['accountability', 'community', 'teamwork', 'ADHD'],
    author: authors['alex-rivera'],
    publishedAt: '2023-12-28',
    coverImage: '/blog/accountability-pod.jpg',
    readingTime: 9,
  },
  {
    slug: 'adhd-friendly-project-management-tools',
    title: 'ADHD-Friendly Project Management Tools',
    subtitle: '2024 Edition: Tools That Work With Your Brain',
    excerpt: 'Not all project management tools are created equal. We tested 15 popular tools and ranked them by ADHD-friendliness based on real user experiences.',
    content: `
# ADHD-Friendly Project Management Tools

After surveying 500+ ADHD users and testing tools ourselves, here's our definitive ranking of project management tools for neurodivergent minds.

## What Makes a Tool ADHD-Friendly?

### 1. Visual Clarity

Clean interfaces with clear hierarchy reduce cognitive load.

### 2. Quick Capture

Ideas come fast. Tools need to capture them faster.

### 3. Flexible Views

Different days call for different perspectives—list, board, calendar.

### 4. Progress Visibility

Clear progress indicators provide dopamine feedback.

### 5. Low Friction

Every extra click is a potential abandonment point.

## The Rankings

### Tier 1: Excellent

**Linear** (9.2/10)
- Beautiful, distraction-free interface
- Keyboard-first design
- Excellent progress tracking
- Best for: Developers, tech projects

**Notion** (8.8/10)
- Ultimate flexibility
- Great for brain dumps
- Satisfying database views
- Best for: Creative projects, personal use

### Tier 2: Good

**Todoist** (8.4/10)
- Quick capture excellence
- Natural language processing
- Simple but powerful
- Best for: Task management purists

**Height** (8.2/10)
- Modern, clean interface
- Great AI features
- Solid progress views
- Best for: Small teams

### Tier 3: Decent

**Asana** (7.5/10)
- Comprehensive features
- Good progress views
- Can feel overwhelming
- Best for: Larger teams with structure

**Monday.com** (7.2/10)
- Very visual
- Many templates
- Sometimes too busy
- Best for: Visual thinkers

### Tier 4: Challenging

**Jira** (5.8/10)
- Powerful but complex
- Steep learning curve
- Information overload
- Best for: Enterprise only

## Our Recommendation

For ADHD users, we recommend starting with **Linear** for structured projects or **Notion** for flexible, creative work.

## The LaunchPod Integration

LaunchPod integrates with all these tools, adding:
- AI-powered task breakdown
- ADHD-specific reminders
- Accountability pod connections
- Progress celebration automation
    `,
    category: 'tools',
    tags: ['tools', 'project management', 'productivity', 'software'],
    author: authors['jordan-park'],
    publishedAt: '2023-12-20',
    coverImage: '/blog/pm-tools.jpg',
    readingTime: 11,
  },
  {
    slug: 'dopamine-menu-for-creators',
    title: 'The Dopamine Menu for Creators',
    subtitle: 'Strategic Reward Systems That Drive Completion',
    excerpt: 'Build your personal dopamine menu—a collection of healthy rewards calibrated to motivate project progress without triggering harmful loops.',
    content: `
# The Dopamine Menu for Creators

ADHD brains are dopamine-seeking. Instead of fighting this, what if we could channel it? Enter the dopamine menu—a strategic approach to motivation.

## What Is a Dopamine Menu?

A dopamine menu is a personalized list of rewards organized by "intensity"—from quick, small boosts to significant celebrations.

### Why It Works

- Provides predictable rewards for unpredictable motivation
- Creates healthy dopamine habits
- Prevents doom-scrolling and harmful dopamine sources
- Makes progress feel immediately worthwhile

## Building Your Menu

### Appetizers (5-10 minutes, small wins)

These are quick rewards for completing small tasks:
- Watch one YouTube video
- Walk around the block
- Play one round of a quick game
- Eat a favorite snack
- Text a friend

### Main Courses (30-60 minutes, milestone rewards)

For completing significant chunks of work:
- Episode of a favorite show
- Video game session
- Coffee shop visit
- Creative hobby time
- Social time

### Desserts (1-3 hours, major milestone rewards)

For hitting big goals:
- Movie night
- Nice meal out
- Shopping trip (budgeted)
- Full game session
- Day trip

### Chef's Specials (Completion rewards)

For shipping the project:
- Vacation day
- Big purchase you've been wanting
- Celebration with friends
- New equipment/tools
- Professional photo/announcement

## The Rules

### 1. No Borrowing

Don't take dessert before you've earned it. This breaks the system.

### 2. Actually Take Them

Skipping earned rewards weakens the association. Celebrate wins.

### 3. Be Specific

"Watch YouTube" is vague. "Watch one Veritasium video" is actionable.

### 4. Update Regularly

What excites you changes. Keep your menu fresh.

## ADHD-Specific Tips

### Pair Difficult Tasks with Appetizers

Working on boring but necessary tasks? Allow an appetizer alongside.

### Time-Box Main Courses

Set a timer for bigger rewards to prevent them from consuming your day.

### Public Accountability for Big Rewards

Tell someone about your chef's special to increase commitment.

## LaunchPod's Reward System

Our AI tracks your progress and suggests menu items:
- Recognizes task completion patterns
- Proposes appropriately-sized rewards
- Prevents reward-creep
- Celebrates alongside your pod
    `,
    category: 'advice',
    tags: ['dopamine', 'motivation', 'rewards', 'ADHD strategies'],
    author: authors['alex-rivera'],
    publishedAt: '2023-12-15',
    coverImage: '/blog/dopamine-menu.jpg',
    readingTime: 8,
  },
  {
    slug: 'from-idea-to-launch-in-30-days',
    title: 'From Idea to Launch in 30 Days',
    subtitle: 'Marcus\'s Newsletter Case Study',
    excerpt: 'How Marcus used LaunchPod to finally launch his tech newsletter after two years of "preparing to launch." Real numbers, real strategies.',
    content: `
# From Idea to Launch in 30 Days

Marcus had been "working on" his tech newsletter for two years. He had 47 draft posts, a fully designed landing page, and zero published issues. Sound familiar?

## The Setup

Marcus is a software engineer with ADHD, diagnosed at 29. His newsletter idea was solid: weekly deep-dives into emerging tech for non-technical leaders.

### The Blockers

- Perfectionism: Every post needed to be "comprehensive"
- Platform paralysis: Substack vs Ghost vs self-hosted?
- Launch anxiety: "What if no one reads it?"
- Scope creep: Each post grew into a series idea

## The 30-Day Sprint

Marcus joined LaunchPod on November 1st. Here's what happened:

### Week 1: Scoping and Setup

**Day 1-2**: AI coach helped define MVP
- Ship 1 post, not 47
- Use Substack (quick setup wins over perfect platform)
- Goal: 100 subscribers by Day 30

**Day 3-7**: First post drafted and edited
- 1,500 words (not 5,000)
- "Good enough" graphics
- Pod review and feedback

### Week 2: Launch

**Day 8**: Hit publish
- Shared in pod first
- Posted on LinkedIn
- Result: 34 subscribers

**Day 9-14**: Second post + promotion
- Kept momentum going
- Subscribers: 67

### Week 3: Momentum

**Day 15-21**: Third post + newsletter swap
- Collaborated with another creator
- Subscribers: 124

### Week 4: Growth Mode

**Day 22-30**: Fourth post + consistent promotion
- Final subscriber count: **183**

## Key Insights

### 1. Ship Something, Then Improve

Marcus's first post wasn't his best. Post #4 was significantly better. But he needed #1 to exist for #4 to happen.

### 2. External Deadlines Work

"Knowing my pod would ask about my progress tomorrow was the only reason I hit publish."

### 3. Comparison Is Deadly

Marcus initially wanted 1,000 Day 1 subscribers because "that's what successful newsletters do." His coach helped reset expectations.

## Current Status (3 months later)

- **1,200+ subscribers**
- Consistent weekly publishing
- First sponsorship ($200)
- Book deal discussions underway

The newsletter exists. That's everything.
    `,
    category: 'case-studies',
    tags: ['case study', 'newsletter', 'content creation', 'launch'],
    author: authors['alex-rivera'],
    publishedAt: '2023-12-10',
    coverImage: '/blog/marcus-newsletter.jpg',
    readingTime: 7,
  },
];

// Helper functions
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getFeaturedPost(): BlogPost | undefined {
  return blogPosts.find(post => post.featured);
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];
  
  return blogPosts
    .filter(post => post.slug !== currentSlug)
    .filter(post => 
      post.category === currentPost.category || 
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .slice(0, limit);
}

export function getPopularPosts(limit: number = 5): BlogPost[] {
  // In a real app, this would be based on actual analytics
  return blogPosts.slice(0, limit);
}

export function searchPosts(query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

export function getAllCategories(): BlogCategory[] {
  return ['advice', 'case-studies', 'research', 'tools'];
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  blogPosts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
}

// Pagination helper
export function paginatePosts(posts: BlogPost[], page: number, perPage: number = 6) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return {
    posts: posts.slice(start, end),
    totalPages: Math.ceil(posts.length / perPage),
    currentPage: page,
    hasMore: end < posts.length,
  };
}

