import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, RequireAuth } from "@/auth/auth";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import OrganizationDashboard from "./pages/OrganizationDashboard";
import CitizenDashboard from "./pages/CitizenDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<RequireAuth><Verify /></RequireAuth>} />
            <Route path="/super-admin" element={<RequireAuth allow={["super-admin"]}><SuperAdminDashboard /></RequireAuth>} />
            <Route path="/organization" element={<RequireAuth allow={["organization"]}><OrganizationDashboard /></RequireAuth>} />
            <Route path="/citizen" element={<RequireAuth allow={["citizen"]}><CitizenDashboard /></RequireAuth>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
