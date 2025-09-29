import { useAuth } from "@/auth/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Upload, FileCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OrganizationDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-emerald-50/50">
      <header className="border-b bg-white/70 backdrop-blur">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">DigiPraman</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Organization: {user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-2">Organization Dashboard</h1>
        <p className="text-muted-foreground mb-8">Verify certificates and manage bulk uploads.</p>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/verify")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-emerald-600" />
                Bulk Upload
              </CardTitle>
              <CardDescription>Upload and verify multiple certificates at once.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-trust-gradient hover:opacity-90">Start Bulk Upload</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/verify")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-blue-600" />
                Single Verification
              </CardTitle>
              <CardDescription>Verify one certificate at a time.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Verify Single Certificate</Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Verifications</CardTitle>
            <CardDescription>View your organization's verification history.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Placeholder: Recent verification logs and API usage stats will appear here.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
