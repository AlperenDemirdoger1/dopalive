'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TaskBreakdownData, TaskStep } from '@/lib/chat/types';
import { staggerContainer, staggerItem, rewardPop } from '@/lib/motion';
import { Check, Circle, ChevronRight, PartyPopper } from 'lucide-react';

/**
 * TaskBreakdownCard Component
 * 
 * ADHD-friendly task breakdown:
 * - Clear visual hierarchy
 * - Satisfying check-off animations
 * - Progress indication
 * - Focus on one step at a time
 */
interface TaskBreakdownCardProps {
  data: TaskBreakdownData;
  onAction?: (action: string, data: unknown) => void;
}

export function TaskBreakdownCard({ data, onAction }: TaskBreakdownCardProps) {
  const [steps, setSteps] = React.useState<TaskStep[]>(data.steps);
  const [activeStep, setActiveStep] = React.useState<number>(0);
  
  const completedCount = steps.filter(s => s.completed).length;
  const progress = (completedCount / steps.length) * 100;
  const isAllComplete = completedCount === steps.length;
  
  const handleToggleStep = (stepId: string) => {
    setSteps(prev => prev.map(step => {
      if (step.id === stepId) {
        const newCompleted = !step.completed;
        if (newCompleted) {
          onAction?.('step_complete', { stepId, text: step.text });
        }
        return { ...step, completed: newCompleted };
      }
      return step;
    }));
    
    // Move to next incomplete step
    const nextIncomplete = steps.findIndex((s, i) => i > activeStep && !s.completed);
    if (nextIncomplete !== -1) {
      setActiveStep(nextIncomplete);
    }
  };
  
  const handleStartStep = (index: number) => {
    setActiveStep(index);
    onAction?.('step_start', { step: steps[index] });
  };
  
  return (
    <motion.div
      variants={rewardPop}
      initial="initial"
      animate={isAllComplete ? 'reward' : 'initial'}
    >
      <Card variant="warm" className="overflow-hidden">
        {/* Header with progress */}
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs text-primary font-medium mb-1">Görev Parçalama</p>
              <CardTitle className="text-base leading-snug">
                {data.taskTitle}
              </CardTitle>
            </div>
            
            {/* Progress indicator */}
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold text-foreground">
                {completedCount}/{steps.length}
              </span>
              <span className="text-xs text-muted-foreground">adım</span>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-3 h-1.5 bg-primary/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-warm rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </CardHeader>
        
        {/* Steps list */}
        <CardContent className="pt-2">
          <motion.div
            variants={staggerContainer(0.05)}
            initial="hidden"
            animate="visible"
            className="space-y-2"
          >
            <AnimatePresence>
              {steps.map((step, index) => (
                <TaskStepItem
                  key={step.id}
                  step={step}
                  index={index}
                  isActive={index === activeStep}
                  onToggle={() => handleToggleStep(step.id)}
                  onStart={() => handleStartStep(index)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
          
          {/* Completion celebration */}
          <AnimatePresence>
            {isAllComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-3 rounded-lg bg-success/10 border border-success/20 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                  <PartyPopper className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="font-semibold text-success text-sm">Harika iş!</p>
                  <p className="text-xs text-success/80">Tüm adımları tamamladın!</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Start first step button */}
          {!isAllComplete && completedCount === 0 && (
            <Button
              variant="primary"
              size="sm"
              className="w-full mt-3"
              onClick={() => handleStartStep(0)}
              rightIcon={ChevronRight}
            >
              İlk Adımı Başlat
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

/**
 * TaskStepItem Component
 */
interface TaskStepItemProps {
  step: TaskStep;
  index: number;
  isActive: boolean;
  onToggle: () => void;
  onStart: () => void;
}

function TaskStepItem({ step, index, isActive, onToggle, onStart }: TaskStepItemProps) {
  return (
    <motion.div
      variants={staggerItem}
      layout
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg transition-all duration-200",
        isActive && !step.completed && "bg-primary/5 border border-primary/20",
        step.completed && "opacity-60"
      )}
    >
      {/* Checkbox */}
      <button
        onClick={onToggle}
        className={cn(
          "mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center",
          "transition-all duration-200",
          step.completed 
            ? "bg-success border-success" 
            : "border-border hover:border-primary"
        )}
      >
        <AnimatePresence>
          {step.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Check className="w-3 h-3 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
      
      {/* Step content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-xs font-medium px-1.5 py-0.5 rounded",
            isActive && !step.completed 
              ? "bg-primary/20 text-primary" 
              : "bg-muted text-muted-foreground"
          )}>
            {index + 1}
          </span>
          {step.estimatedMinutes && (
            <span className="text-xs text-muted-foreground">
              ~{step.estimatedMinutes} dk
            </span>
          )}
        </div>
        <p className={cn(
          "text-sm mt-1",
          step.completed && "line-through text-muted-foreground"
        )}>
          {step.text}
        </p>
      </div>
    </motion.div>
  );
}

export type { TaskBreakdownCardProps };

