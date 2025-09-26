import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon, User, CreditCard, School, Calendar as CalendarLucide, Hash } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface MetadataStepProps {
  value: {
    candidateName: string;
    rollNumber: string;
    institution: string;
    yearOfPassing: string;
    certificateNumber: string;
  };
  onChange: (value: MetadataStepProps['value']) => void;
}

const popularInstitutions = [
  'University of Delhi',
  'Jawaharlal Nehru University',
  'Indian Institute of Technology Delhi',
  'Indian Institute of Technology Bombay',
  'Indian Institute of Science Bangalore',
  'Banaras Hindu University',
  'Aligarh Muslim University',
  'University of Calcutta',
  'University of Mumbai',
  'Anna University'
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => (currentYear - i).toString());

export function MetadataStep({ value, onChange }: MetadataStepProps) {
  const [datePickerOpen, setDatePickerOpen] = React.useState(false);
  
  const handleInputChange = (field: keyof typeof value, newValue: string) => {
    onChange({
      ...value,
      [field]: newValue
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      handleInputChange('yearOfPassing', date.getFullYear().toString());
      setDatePickerOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Enter Certificate Details
        </h3>
        <p className="text-muted-foreground mb-6">
          Provide accurate information as it appears on your certificate
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Candidate Name */}
        <Card className="p-0 border-0 shadow-none">
          <CardContent className="p-0">
            <Label htmlFor="candidateName" className="flex items-center gap-2 text-sm font-medium mb-2">
              <User className="h-4 w-4 text-primary" />
              Candidate Name *
            </Label>
            <Input
              id="candidateName"
              value={value.candidateName}
              onChange={(e) => handleInputChange('candidateName', e.target.value)}
              placeholder="Enter full name as on certificate"
              className="h-11"
            />
          </CardContent>
        </Card>

        {/* Roll Number */}
        <Card className="p-0 border-0 shadow-none">
          <CardContent className="p-0">
            <Label htmlFor="rollNumber" className="flex items-center gap-2 text-sm font-medium mb-2">
              <CreditCard className="h-4 w-4 text-primary" />
              Roll Number / Registration ID *
            </Label>
            <Input
              id="rollNumber"
              value={value.rollNumber}
              onChange={(e) => handleInputChange('rollNumber', e.target.value)}
              placeholder="Enter roll number or registration ID"
              className="h-11"
            />
          </CardContent>
        </Card>

        {/* Institution */}
        <Card className="p-0 border-0 shadow-none md:col-span-2">
          <CardContent className="p-0">
            <Label htmlFor="institution" className="flex items-center gap-2 text-sm font-medium mb-2">
              <School className="h-4 w-4 text-primary" />
              Institution / University Name *
            </Label>
            <Select value={value.institution} onValueChange={(val) => handleInputChange('institution', val)}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select or type your institution name" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {popularInstitutions.map((institution) => (
                  <SelectItem key={institution} value={institution}>
                    {institution}
                  </SelectItem>
                ))}
                <SelectItem value="other">Other Institution</SelectItem>
              </SelectContent>
            </Select>
            
            {value.institution === 'other' && (
              <Input
                className="mt-2 h-11"
                placeholder="Enter institution name"
                onChange={(e) => handleInputChange('institution', e.target.value)}
              />
            )}
          </CardContent>
        </Card>

        {/* Year of Passing */}
        <Card className="p-0 border-0 shadow-none">
          <CardContent className="p-0">
            <Label className="flex items-center gap-2 text-sm font-medium mb-2">
              <CalendarLucide className="h-4 w-4 text-primary" />
              Year of Passing *
            </Label>
            
            <div className="flex gap-2">
              <Select value={value.yearOfPassing} onValueChange={(val) => handleInputChange('yearOfPassing', val)}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="h-11 px-3">
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={value.yearOfPassing ? new Date(parseInt(value.yearOfPassing), 0, 1) : undefined}
                    onSelect={handleDateSelect}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1950-01-01")
                    }
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* Certificate Number */}
        <Card className="p-0 border-0 shadow-none">
          <CardContent className="p-0">
            <Label htmlFor="certificateNumber" className="flex items-center gap-2 text-sm font-medium mb-2">
              <Hash className="h-4 w-4 text-primary" />
              Certificate Issue Number
            </Label>
            <Input
              id="certificateNumber"
              value={value.certificateNumber}
              onChange={(e) => handleInputChange('certificateNumber', e.target.value)}
              placeholder="Enter certificate number (if available)"
              className="h-11"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Optional - helps with faster verification
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Validation Summary */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
              <User className="h-3 w-3 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-primary mb-1">Verification Note</h4>
              <p className="text-sm text-muted-foreground">
                Ensure all details match exactly with your certificate. Any mismatch may lead to verification failure.
                The system will cross-verify this information with official databases.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}