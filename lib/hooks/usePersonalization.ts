'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
  loadProfile, 
  DopamineProfile, 
  DopamineProfileType,
  DOPAMINE_ARCHETYPES 
} from '@/lib/quiz';
import { 
  ARCHETYPE_JOURNEYS, 
  ARCHETYPE_TIPS, 
  Journey,
  DailyTip 
} from '@/lib/journeys';

/**
 * DopaLive Personalization Hook
 * 
 * Provides personalized content based on the user's dopamine profile.
 * Uses localStorage to check quiz completion status and archetype.
 */

export interface PersonalizationState {
  /** Whether data is still loading */
  isLoading: boolean;
  /** Whether the user has completed the quiz */
  hasCompletedQuiz: boolean;
  /** User's dopamine profile (if quiz completed) */
  profile: DopamineProfile | null;
  /** User's archetype key */
  archetypeKey: DopamineProfileType | null;
  /** Archetype display name */
  archetypeName: string | null;
  /** Archetype emoji */
  archetypeEmoji: string | null;
  /** Recommended journeys based on archetype */
  recommendedJourneys: Journey[];
  /** Today's personalized tip */
  dailyTip: DailyTip | null;
  /** User's display name (from auth or default) */
  displayName: string;
  /** Current streak (mock for now) */
  currentStreak: number;
  /** Whether body doubling is recommended based on profile */
  bodyDoublingRecommended: boolean;
}

// Local storage keys
const STREAK_KEY = 'dopalive_streak';
const LAST_VISIT_KEY = 'dopalive_last_visit';

/**
 * Get current streak from localStorage
 * Updates streak based on consecutive daily visits
 */
function getStreak(): number {
  if (typeof window === 'undefined') return 0;
  
  const now = new Date();
  const today = now.toDateString();
  const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
  let streak = parseInt(localStorage.getItem(STREAK_KEY) || '0', 10);
  
  if (!lastVisit) {
    // First visit
    localStorage.setItem(LAST_VISIT_KEY, today);
    localStorage.setItem(STREAK_KEY, '1');
    return 1;
  }
  
  if (lastVisit === today) {
    // Already visited today
    return streak;
  }
  
  const lastDate = new Date(lastVisit);
  const daysDiff = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysDiff === 1) {
    // Consecutive day
    streak += 1;
  } else if (daysDiff > 1) {
    // Streak broken
    streak = 1;
  }
  
  localStorage.setItem(LAST_VISIT_KEY, today);
  localStorage.setItem(STREAK_KEY, streak.toString());
  
  return streak;
}

/**
 * Get daily tip based on archetype
 * Rotates through tips based on day of year
 */
function getDailyTip(archetypeKey: DopamineProfileType | null): DailyTip | null {
  if (!archetypeKey) return null;
  
  const tips = ARCHETYPE_TIPS[archetypeKey];
  if (!tips || tips.length === 0) return null;
  
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 
    (1000 * 60 * 60 * 24)
  );
  
  return tips[dayOfYear % tips.length];
}

/**
 * Main personalization hook
 */
export function usePersonalization(): PersonalizationState {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<DopamineProfile | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [currentStreak, setCurrentStreak] = useState(0);

  // Load profile and streak on mount
  useEffect(() => {
    const loadData = () => {
      // Load profile
      const savedProfile = loadProfile();
      setProfile(savedProfile);
      
      // Load streak
      const streak = getStreak();
      setCurrentStreak(streak);
      
      // Get display name from localStorage or use default
      const storedName = localStorage.getItem('dopalive_user_name');
      setDisplayName(storedName || 'Gezgin');
      
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Compute derived values
  const hasCompletedQuiz = profile !== null;
  const archetypeKey = profile?.archetypeKey || null;
  
  const archetype = archetypeKey ? DOPAMINE_ARCHETYPES[archetypeKey] : null;
  const archetypeName = archetype?.name || null;
  const archetypeEmoji = archetype?.emoji || null;

  // Get recommended journeys
  const recommendedJourneys = useMemo(() => {
    if (!archetypeKey) return [];
    return ARCHETYPE_JOURNEYS[archetypeKey] || [];
  }, [archetypeKey]);

  // Get daily tip
  const dailyTip = useMemo(() => {
    return getDailyTip(archetypeKey);
  }, [archetypeKey]);

  // Check if body doubling is recommended
  const bodyDoublingRecommended = useMemo(() => {
    if (!profile) return true; // Default to recommended
    // High external support score means body doubling is beneficial
    return profile.scores.externalSupport >= 60;
  }, [profile]);

  return {
    isLoading,
    hasCompletedQuiz,
    profile,
    archetypeKey,
    archetypeName,
    archetypeEmoji,
    recommendedJourneys,
    dailyTip,
    displayName,
    currentStreak,
    bodyDoublingRecommended,
  };
}

export default usePersonalization;

