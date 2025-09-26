import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { StepIndicator } from './StepIndicator';
import { CertificateTypeStep } from './CertificateTypeStep';
import { FileUploadStep } from './FileUploadStep';
import { MetadataStep } from './MetadataStep';
import { BulkUploadStep } from './BulkUploadStep';
import { VerificationStep } from './VerificationStep';
import { SubmitStep } from './SubmitStep';
import { Shield, FileCheck, Zap } from 'lucide-react';

const steps = [
  { id: 1, title: 'Certificate Type', description: 'Select document type' },
  { id: 2, title: 'Upload File', description: 'Add your certificate' },
  { id: 3, title: 'Enter Details', description: 'Provide metadata' },
  { id: 4, title: 'Bulk Options', description: 'Multiple certificates' },
  { id: 5, title: 'Verification', description: 'Choose verification mode' },
  { id: 6, title: 'Submit', description: 'Process verification' }
];

interface FormData {
  certificateType: string;
  files: File[];
  metadata: {
    candidateName: string;
    rollNumber: string;
    institution: string;
    yearOfPassing: string;
    certificateNumber: string;
  };
  bulkUpload: {
    enabled: boolean;
    files: File[];
    apiConnection: string;
  };
  verificationMode: 'online' | 'offline';
}

export function CertificateUploadForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    certificateType: '',
    files: [],
    metadata: {
      candidateName: '',
      rollNumber: '',
      institution: '',
      yearOfPassing: '',
      certificateNumber: ''
    },
    bulkUpload: {
      enabled: false,
      files: [],
      apiConnection: ''
    },
    verificationMode: 'online'
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const progressValue = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (stepData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CertificateTypeStep value={formData.certificateType} onChange={(type) => updateFormData({ certificateType: type })} />;
      case 2:
        return <FileUploadStep files={formData.files} onChange={(files) => updateFormData({ files })} />;
      case 3:
        return <MetadataStep value={formData.metadata} onChange={(metadata) => updateFormData({ metadata })} />;
      case 4:
        return <BulkUploadStep value={formData.bulkUpload} onChange={(bulkUpload) => updateFormData({ bulkUpload })} />;
      case 5:
        return <VerificationStep value={formData.verificationMode} onChange={(verificationMode) => updateFormData({ verificationMode })} />;
      case 6:
        return <SubmitStep formData={formData} isProcessing={isProcessing} onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!formData.certificateType;
      case 2: return formData.files.length > 0;
      case 3: return !!(formData.metadata.candidateName && formData.metadata.rollNumber && formData.metadata.institution);
      case 4: return true; // Optional step
      case 5: return !!formData.verificationMode;
      case 6: return true;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <div className="bg-trust-gradient text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8" />
            <h1 className="text-3xl font-bold">DigiPraman</h1>
          </div>
          <p className="text-primary-foreground/90 text-lg">
            Secure Certificate Verification Platform
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Certificate Upload & Verification
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileCheck className="h-4 w-4" />
              Step {currentStep} of {steps.length}
            </div>
          </div>
          <Progress value={progressValue} className="mb-6" />
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>

        {/* Main Form */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-card border-0 animate-fade-in">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Zap className="h-5 w-5 text-primary" />
                {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription className="text-base">
                {steps[currentStep - 1].description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {renderStep()}
              
              {/* Navigation */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="min-w-[100px]"
                >
                  Previous
                </Button>
                
                {currentStep < steps.length ? (
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="min-w-[100px] bg-trust-gradient hover:opacity-90"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!canProceed() || isProcessing}
                    className="min-w-[120px] bg-success-gradient hover:opacity-90"
                  >
                    {isProcessing ? 'Processing...' : 'Verify Now'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}