import { useAuth } from "@/auth/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, BarChart3, AlertTriangle, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SuperAdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-blue-50/50">
      <header className="border-b bg-white/70 backdrop-blur">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">DigiPraman</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Super Admin: {user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-2">Super Admin Dashboard</h1>
        <p className="text-muted-foreground mb-8">Government-level oversight and system-wide analytics.</p>

        <div className="grid md:grid-cols-3 gap-6">
          <StatCard icon={<BarChart3 />} title="Total Verifications" value="12,345" />
          <StatCard icon={<AlertTriangle />} title="Fraud Alerts" value="23" />
          <StatCard icon={<Users />} title="Active Organizations" value="456" />
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>System Reports</CardTitle>
            <CardDescription>View detailed analytics and audit trails.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Placeholder: System-wide reports, fraud detection logs, and compliance metrics will appear here.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">{icon}</div>
          <div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground">{title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
