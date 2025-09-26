import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Users, Database, Link as LinkIcon, FileSpreadsheet, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface BulkUploadStepProps {
  value: {
    enabled: boolean;
    files: File[];
    apiConnection: string;
  };
  onChange: (value: BulkUploadStepProps['value']) => void;
}

export function BulkUploadStep({ value, onChange }: BulkUploadStepProps) {
  const handleBulkToggle = (enabled: boolean) => {
    onChange({
      ...value,
      enabled,
      files: enabled ? value.files : [],
      apiConnection: enabled ? value.apiConnection : ''
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    onChange({
      ...value,
      files: [...value.files, ...files]
    });
  };

  const handleApiConnection = (apiType: string) => {
    onChange({
      ...value,
      apiConnection: apiType
    });
  };

  const removeFile = (index: number) => {
    const newFiles = value.files.filter((_, i) => i !== index);
    onChange({
      ...value,
      files: newFiles
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Bulk Upload Options
        </h3>
        <p className="text-muted-foreground mb-6">
          For institutions and employers processing multiple certificates
        </p>
      </div>

      {/* Enable Bulk Upload Toggle */}
      <Card>
        <CardContent className="flex items-center justify-between py-6">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <Label htmlFor="bulk-upload" className="text-base font-medium">
                Enable Bulk Processing
              </Label>
              <p className="text-sm text-muted-foreground">
                Process multiple certificates at once
              </p>
            </div>
          </div>
          <Switch
            id="bulk-upload"
            checked={value.enabled}
            onCheckedChange={handleBulkToggle}
          />
        </CardContent>
      </Card>

      {value.enabled && (
        <div className="space-y-6 animate-slide-up">
          {/* CSV/Excel Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileSpreadsheet className="h-5 w-5 text-primary" />
                Upload CSV/Excel File
              </CardTitle>
              <CardDescription>
                Upload a spreadsheet with multiple candidate records
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  Drag & drop your CSV/Excel file or click to browse
                </p>
                
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="bulk-file-upload"
                  multiple
                />
                
                <Button asChild variant="outline">
                  <label htmlFor="bulk-file-upload" className="cursor-pointer">
                    Choose File
                  </label>
                </Button>
              </div>

              {value.files.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Uploaded Files:</Label>
                  {value.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <span className="text-sm">{file.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="h-6 w-6 p-0"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
                      CSV Format Requirements
                    </p>
                    <p className="text-xs text-blue-700 dark:text-blue-400">
                      Columns: Name, Roll Number, Institution, Year of Passing, Certificate Number
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-sm text-muted-foreground">OR</span>
            <Separator className="flex-1" />
          </div>

          {/* API Connection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <LinkIcon className="h-5 w-5 text-primary" />
                API Integration
              </CardTitle>
              <CardDescription>
                Connect with government databases and credential providers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label className="text-sm font-medium">Select API Provider:</Label>
              
              <Select value={value.apiConnection} onValueChange={handleApiConnection}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose API integration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="digilocker">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      DigiLocker API
                      <Badge variant="secondary" className="ml-auto">Government</Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="nad">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      National Academic Depository (NAD)
                      <Badge variant="secondary" className="ml-auto">Academic</Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="abc">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      Academic Bank of Credits (ABC)
                      <Badge variant="secondary" className="ml-auto">Credits</Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="custom">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      Custom API Endpoint
                      <Badge variant="outline" className="ml-auto">Custom</Badge>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {value.apiConnection && (
                <Card className="bg-accent/5 border-accent/20">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                        <LinkIcon className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium text-accent mb-1">
                          API Connection: {value.apiConnection.toUpperCase()}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          This integration will automatically fetch and validate certificates from the selected provider.
                          Authentication credentials will be required in the next step.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {!value.enabled && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h4 className="text-lg font-medium mb-2">Bulk Processing Disabled</h4>
            <p className="text-muted-foreground mb-4">
              Enable bulk processing to upload multiple certificates at once
            </p>
            <Button 
              variant="outline" 
              onClick={() => handleBulkToggle(true)}
              className="hover:bg-primary hover:text-white transition-colors"
            >
              Enable Bulk Upload
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}