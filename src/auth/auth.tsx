import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";

export type Role = "super-admin" | "organization" | "citizen";

export type User = {
  email: string;
  role: Role;
};

type AuthContextValue = {
  user: User | null;
  login: (email: string, _password: string, role: Role) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const LS_KEY = "dp_auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem(LS_KEY);
      }
    }
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    login: async (email, _password, role) => {
      // Placeholder: accept any credentials and selected role
      const u = { email, role } as User;
      localStorage.setItem(LS_KEY, JSON.stringify(u));
      setUser(u);
    },
    logout: () => {
      localStorage.removeItem(LS_KEY);
      setUser(null);
    }
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function useRoleRedirect() {
  const navigate = useNavigate();
  return (role: Role) => {
    if (role === "super-admin") navigate("/super-admin", { replace: true });
    else if (role === "organization") navigate("/organization", { replace: true });
    else navigate("/citizen", { replace: true });
  };
}

export function RequireAuth({ children, allow }: { children: JSX.Element; allow?: Role[] }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allow && !allow.includes(user.role)) {
    // If logged in but not allowed, send to their home dashboard
    const roleHome = user.role === "super-admin" ? "/super-admin" : user.role === "organization" ? "/organization" : "/citizen";
    return <Navigate to={roleHome} replace />;
  }

  return children;
}
