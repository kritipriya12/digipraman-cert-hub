import { useAuth } from "@/auth/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, FileCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CitizenDashboard() {
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
            <span className="text-sm text-muted-foreground">Citizen: {user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-2">Citizen Dashboard</h1>
        <p className="text-muted-foreground mb-8">Upload and verify your certificates securely.</p>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-emerald-600" />
              Verify Your Certificate
            </CardTitle>
            <CardDescription>Upload a single certificate for verification. Bulk upload is not available for citizens.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-trust-gradient hover:opacity-90" onClick={() => navigate("/verify")}>
              Start Verification
            </Button>
          </CardContent>
        </Card>

        <Card className="mt-8 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Your Verifications</CardTitle>
            <CardDescription>View your past certificate verification history.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Placeholder: Your verification history will appear here.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
