import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ScanLine, Sparkles } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-emerald-50/50 dark:to-emerald-900/10">
      {/* Header */}
      <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:bg-background/70">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">DigiPraman</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="text-muted-foreground hover:text-foreground">Features</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login"><Button variant="outline">Login</Button></Link>
            <a href="#learn-more"><Button className="bg-trust-gradient hover:opacity-90">Learn More</Button></a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground mb-4 bg-white/60">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              Blockchain & AI secured
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              DigiPraman
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-prose">
              Tamper-proof Certificate Verification powered by Blockchain & AI.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/login"><Button size="lg" className="bg-trust-gradient hover:opacity-90">Login</Button></Link>
              <a href="#learn-more"><Button size="lg" variant="outline">Learn More</Button></a>
              <a href="#contact"><Button size="lg" variant="ghost">Contact</Button></a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-success-gradient opacity-10 blur-2xl rounded-3xl" />
            <div className="relative rounded-2xl border bg-card shadow-card p-6">
              <div className="flex items-center gap-3">
                <ScanLine className="h-6 w-6 text-emerald-600" />
                <div>
                  <p className="font-semibold">Instant Verification</p>
                  <p className="text-sm text-muted-foreground">Fast, reliable, and secure</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-emerald-600">99.9%</p>
                  <p className="text-xs text-muted-foreground">Integrity</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">24/7</p>
                  <p className="text-xs text-muted-foreground">Availability</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">GDPR</p>
                  <p className="text-xs text-muted-foreground">Compliant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learn More */}
      <section id="learn-more" className="container mx-auto px-6 pb-16" >
        <div id="features" className="grid md:grid-cols-3 gap-6">
          <Feature title="Government-Grade Trust" desc="Transparent audit trails and fraud alerts for administrators."/>
          <Feature title="For Organizations" desc="APIs and bulk tools to verify thousands of certificates."/>
          <Feature title="For Citizens" desc="Simple, single-certificate upload and verification."/>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t bg-white/60">
        <div className="container mx-auto px-6 py-10">
          <p className="text-sm text-muted-foreground">Questions? Email support@digipraman.gov</p>
        </div>
      </section>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-card hover:shadow-md transition-shadow">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
