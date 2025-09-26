import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Globe, Wifi, WifiOff, Shield, Zap, Clock, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VerificationStepProps {
  value: 'online' | 'offline';
  onChange: (value: 'online' | 'offline') => void;
}

const verificationModes = [
  {
    id: 'online' as const,
    title: 'Online Verification',
    description: 'Real-time database + blockchain verification',
    icon: Globe,
    features: [
      'Real-time database cross-verification',
      'Blockchain consensus validation',
      'Government database integration',
      'Highest accuracy and reliability'
    ],
    badge: { text: 'Recommended', variant: 'default' as const },
    time: '2-5 minutes',
    accuracy: '99.9%',
    requirements: 'Internet connection required'
  },
  {
    id: 'offline' as const,
    title: 'Offline Verification',
    description: 'Local system check – lightweight, no GPU needed',
    icon: WifiOff,
    features: [
      'Local certificate analysis',
      'OCR and document structure validation',
      'Fraud detection algorithms',
      'Works without internet connection'
    ],
    badge: { text: 'Fast', variant: 'secondary' as const },
    time: '30 seconds',
    accuracy: '85-90%',
    requirements: 'No internet required'
  }
];

export function VerificationStep({ value, onChange }: VerificationStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Choose Verification Mode
        </h3>
        <p className="text-muted-foreground mb-6">
          Select the verification method that best suits your needs
        </p>
      </div>

      <RadioGroup value={value} onValueChange={onChange} className="space-y-4">
        {verificationModes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = value === mode.id;
          
          return (
            <Label
              key={mode.id}
              htmlFor={mode.id}
              className="cursor-pointer"
            >
              <Card
                className={cn(
                  "transition-all duration-300 hover:shadow-step cursor-pointer",
                  isSelected ? "ring-2 ring-primary bg-primary/5 shadow-step" : "hover:bg-muted/50"
                )}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <RadioGroupItem value={mode.id} id={mode.id} className="mt-1" />
                      <div
                        className={cn(
                          "flex items-center justify-center w-12 h-12 rounded-lg transition-colors",
                          isSelected ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                        )}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          {mode.title}
                          <Badge variant={mode.badge.variant} className="text-xs">
                            {mode.badge.text}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-base">
                          {mode.description}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Processing Time</span>
                      </div>
                      <div className="text-sm font-medium">{mode.time}</div>
                    </div>
                    
                    <div className="text-center border-l border-r border-border">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Accuracy</span>
                      </div>
                      <div className="text-sm font-medium">{mode.accuracy}</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Wifi className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Connection</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{mode.requirements}</div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div>
                    <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {mode.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mode-specific Info */}
                  {mode.id === 'online' && isSelected && (
                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <Zap className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h5 className="font-medium text-primary mb-1">Enhanced Security</h5>
                            <p className="text-sm text-muted-foreground">
                              Online verification provides the highest level of security by cross-referencing 
                              with multiple government databases and blockchain networks for tamper-proof validation.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {mode.id === 'offline' && isSelected && (
                    <Card className="bg-accent/5 border-accent/20">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <Zap className="h-5 w-5 text-accent mt-0.5" />
                          <div>
                            <h5 className="font-medium text-accent mb-1">Quick Processing</h5>
                            <p className="text-sm text-muted-foreground">
                              Offline verification is perfect for quick checks and scenarios where internet 
                              connectivity is limited. Uses advanced OCR and fraud detection algorithms.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </Label>
          );
        })}
      </RadioGroup>
    </div>
  );
}