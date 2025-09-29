import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth, useRoleRedirect, Role } from "@/auth/auth";
import { ShieldCheck } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const roleRedirect = useRoleRedirect();
  const location = useLocation() as any;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;
    setLoading(true);
    await login(email || "guest@digipraman.gov", password || "password", role);
    // Prefer redirect by role; could use location.state.from
    roleRedirect(role);
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-b from-background via-primary/5 to-emerald-50/50">
      <Card className="w-full max-w-md border-0 shadow-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <CardTitle>DigiPraman Login</CardTitle>
          </div>
          <CardDescription>
            Role-based access for Super Admins, Organizations, and Citizens.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Role</Label>
              <Select value={role} onValueChange={(v: Role) => setRole(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super-admin">Super Admin (Government)</SelectItem>
                  <SelectItem value="organization">Organization</SelectItem>
                  <SelectItem value="citizen">Normal Citizen</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full bg-trust-gradient hover:opacity-90" disabled={!role || loading}>
              {loading ? "Signing in..." : "Login"}
            </Button>
            <p className="text-xs text-muted-foreground">
              Demo auth: credentials are placeholder; select role to continue.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
