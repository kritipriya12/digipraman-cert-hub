import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap, FileText, Award, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CertificateTypeStepProps {
  value: string;
  onChange: (value: string) => void;
}

const certificateTypes = [
  {
    id: 'degree',
    label: 'Degree Certificate',
    description: 'Bachelor\'s, Master\'s, or PhD certificates',
    icon: GraduationCap,
  },
  {
    id: 'marksheet',
    label: 'Marksheet',
    description: 'Academic transcripts and grade reports',
    icon: FileText,
  },
  {
    id: 'diploma',
    label: 'Diploma',
    description: 'Diploma and certification courses',
    icon: Award,
  },
];

export function CertificateTypeStep({ value, onChange }: CertificateTypeStepProps) {
  const [otherType, setOtherType] = React.useState('');

  const handleTypeChange = (newValue: string) => {
    onChange(newValue);
    if (newValue !== 'other') {
      setOtherType('');
    }
  };

  const handleOtherTypeChange = (newValue: string) => {
    setOtherType(newValue);
    onChange(`other:${newValue}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Select Certificate Type
        </h3>
        
        <RadioGroup value={value} onValueChange={handleTypeChange} className="space-y-4">
          {certificateTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = value === type.id;
            
            return (
              <Label
                key={type.id}
                htmlFor={type.id}
                className="cursor-pointer"
              >
                <Card
                  className={cn(
                    "transition-all duration-200 hover:shadow-step cursor-pointer",
                    isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
                  )}
                >
                  <CardContent className="flex items-center space-x-4 p-4">
                    <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                    <div
                      className={cn(
                        "flex items-center justify-center w-12 h-12 rounded-lg transition-colors",
                        isSelected ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{type.label}</div>
                      <div className="text-sm text-muted-foreground">{type.description}</div>
                    </div>
                  </CardContent>
                </Card>
              </Label>
            );
          })}
          
          {/* Other Option */}
          <Label htmlFor="other" className="cursor-pointer">
            <Card
              className={cn(
                "transition-all duration-200 hover:shadow-step cursor-pointer",
                value.startsWith('other') ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
              )}
            >
              <CardContent className="flex items-center space-x-4 p-4">
                <RadioGroupItem value="other" id="other" className="mt-1" />
                <div
                  className={cn(
                    "flex items-center justify-center w-12 h-12 rounded-lg transition-colors",
                    value.startsWith('other') ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  )}
                >
                  <MoreHorizontal className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">Other</div>
                  <div className="text-sm text-muted-foreground">Custom certificate type</div>
                </div>
              </CardContent>
            </Card>
          </Label>
        </RadioGroup>
        
        {value.startsWith('other') && (
          <div className="mt-4 animate-slide-up">
            <Label htmlFor="other-type" className="text-sm font-medium">
              Specify Certificate Type
            </Label>
            <Select value={otherType} onValueChange={handleOtherTypeChange}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select or type custom certificate type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional Certificate</SelectItem>
                <SelectItem value="skill">Skill Certificate</SelectItem>
                <SelectItem value="training">Training Certificate</SelectItem>
                <SelectItem value="language">Language Certificate</SelectItem>
                <SelectItem value="technical">Technical Certificate</SelectItem>
                <SelectItem value="custom">Custom Certificate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
}
