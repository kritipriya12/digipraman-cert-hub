import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between relative">
      {/* Progress Line */}
      <div className="absolute top-6 left-0 w-full h-0.5 bg-border">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>
      
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isCurrent = currentStep === step.id;
        
        return (
          <div key={step.id} className="flex flex-col items-center relative z-10">
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                "bg-background shadow-step",
                {
                  "border-primary bg-trust-gradient text-white animate-glow": isCurrent,
                  "border-accent bg-success-gradient text-white": isCompleted,
                  "border-border text-muted-foreground": !isCurrent && !isCompleted,
                }
              )}
            >
              {isCompleted ? (
                <Check className="h-5 w-5" />
              ) : (
                <span className="text-sm font-semibold">{step.id}</span>
              )}
            </div>
            
            <div className="mt-3 text-center max-w-24">
              <div
                className={cn(
                  "text-xs font-medium transition-colors duration-300",
                  {
                    "text-primary": isCurrent,
                    "text-accent": isCompleted,
                    "text-muted-foreground": !isCurrent && !isCompleted,
                  }
                )}
              >
                {step.title}
              </div>
              <div className="text-xs text-muted-foreground mt-1 hidden sm:block">
                {step.description}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}