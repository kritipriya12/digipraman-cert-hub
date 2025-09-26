import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle, 
  Clock, 
  Shield, 
  FileCheck, 
  User, 
  School, 
  Calendar,
  Zap,
  AlertCircle,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface SubmitStepProps {
  formData: FormData;
  isProcessing: boolean;
  onSubmit: () => void;
}

export function SubmitStep({ formData, isProcessing, onSubmit }: SubmitStepProps) {
  const [processingStage, setProcessingStage] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  const processingStages = [
    { label: 'Analyzing Certificate', description: 'OCR and structure analysis' },
    { label: 'Database Verification', description: 'Cross-checking with official records' },
    { label: 'Blockchain Validation', description: 'Consensus verification' },
    { label: 'Final Report', description: 'Generating verification report' }
  ];

  React.useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 2;
          
          // Update processing stage based on progress
          if (newProgress >= 25 && processingStage < 1) setProcessingStage(1);
          if (newProgress >= 50 && processingStage < 2) setProcessingStage(2);
          if (newProgress >= 75 && processingStage < 3) setProcessingStage(3);
          
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 60);

      return () => clearInterval(interval);
    }
  }, [isProcessing, processingStage]);

  const getCertificateTypeDisplay = (type: string) => {
    if (type.startsWith('other:')) {
      return type.replace('other:', '').charAt(0).toUpperCase() + type.replace('other:', '').slice(1);
    }
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  if (isProcessing) {
    return (
      <div className="space-y-6">
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Zap className="h-5 w-5 animate-pulse" />
              Processing Verification
            </CardTitle>
            <CardDescription>
              AI + Blockchain verification in progress...
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2 mb-4" />
            </div>

            <div className="space-y-4">
              {processingStages.map((stage, index) => {
                const isActive = processingStage === index;
                const isCompleted = processingStage > index;
                
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all",
                        {
                          "border-primary bg-primary text-white animate-pulse": isActive,
                          "border-accent bg-accent text-white": isCompleted,
                          "border-muted bg-muted text-muted-foreground": !isActive && !isCompleted,
                        }
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <span className="text-xs font-medium">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div
                        className={cn(
                          "font-medium transition-colors",
                          {
                            "text-primary": isActive,
                            "text-accent": isCompleted,
                            "text-muted-foreground": !isActive && !isCompleted,
                          }
                        )}
                      >
                        {stage.label}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stage.description}
                      </div>
                    </div>
                    {isActive && (
                      <Clock className="h-4 w-4 text-primary animate-spin" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Review & Submit for Verification
        </h3>
        <p className="text-muted-foreground mb-6">
          Please review all information before submitting for verification
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Certificate Information */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <FileCheck className="h-4 w-4 text-primary" />
              Certificate Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Type:</span>
              <Badge variant="outline">
                {getCertificateTypeDisplay(formData.certificateType)}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Files:</span>
              <span className="text-sm font-medium">
                {formData.files.length} file{formData.files.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Verification Mode:</span>
              <Badge variant={formData.verificationMode === 'online' ? 'default' : 'secondary'}>
                {formData.verificationMode === 'online' ? 'Online' : 'Offline'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Candidate Information */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-4 w-4 text-primary" />
              Candidate Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-sm text-muted-foreground">Name:</span>
              <div className="font-medium">{formData.metadata.candidateName}</div>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Roll Number:</span>
              <div className="font-medium">{formData.metadata.rollNumber}</div>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Year:</span>
              <span className="text-sm font-medium">{formData.metadata.yearOfPassing}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Institution Information */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base">
            <School className="h-4 w-4 text-primary" />
            Institution Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">{formData.metadata.institution}</div>
              {formData.metadata.certificateNumber && (
                <div className="text-sm text-muted-foreground mt-1">
                  Certificate #: {formData.metadata.certificateNumber}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {formData.metadata.yearOfPassing}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Upload Info */}
      {formData.bulkUpload.enabled && (
        <Card className="border-accent/20 bg-accent/5">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base text-accent">
              <Shield className="h-4 w-4" />
              Bulk Processing Enabled
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {formData.bulkUpload.files.length > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Bulk Files:</span>
                <span className="text-sm font-medium">
                  {formData.bulkUpload.files.length} file{formData.bulkUpload.files.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
            {formData.bulkUpload.apiConnection && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">API Connection:</span>
                <Badge variant="outline" className="text-accent">
                  {formData.bulkUpload.apiConnection.toUpperCase()}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Separator />

      {/* Security Notice */}
      <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
                Security & Privacy
              </h4>
              <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                <li>• All data is encrypted during transmission and processing</li>
                <li>• Verification results are stored securely with blockchain attestation</li>
                <li>• Personal information is handled according to data protection regulations</li>
                <li>• You will receive a downloadable verification report upon completion</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <Button
          onClick={onSubmit}
          className="flex-1 bg-success-gradient hover:opacity-90 h-12 text-base font-medium"
          disabled={isProcessing}
        >
          <Zap className="h-5 w-5 mr-2" />
          Start Verification Process
        </Button>
        
        <Button
          variant="outline"
          className="px-8 h-12"
        >
          <Download className="h-4 w-4 mr-2" />
          Save Draft
        </Button>
      </div>

      {/* Estimated Time */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          Estimated processing time: {formData.verificationMode === 'online' ? '2-5 minutes' : '30 seconds'}
        </div>
      </div>
    </div>
  );
}