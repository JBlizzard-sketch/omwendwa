import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { LockKeyhole, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import "@lovable.dev/cloud-auth-js/styles.css";
import { useStaff } from "@/hooks/use-staff";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SEOHead from "@/components/SEOHead";

export default function StaffLogin() {
  const staff = useStaff();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgot, setForgot] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  if (staff.user && !staff.loading) return <Navigate to="/staff" replace />;
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setBusy(true); setMessage("");
    try {
      const result = forgot
        ? await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` })
        : await supabase.auth.signInWithPassword({ email, password });
      setMessage(result.error ? result.error.message : forgot ? "If this address has an account, a password reset link is on its way." : "");
    } catch { setMessage("Sign-in is unavailable right now. Please try again."); }
    finally { setBusy(false); }
  };
  const social = async (provider: "google" | "lovable") => {
    setBusy(true); setMessage("");
    try {
      const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: `${window.location.origin}/staff/login` });
      if (result.error) setMessage(result.error.message);
    } catch { setMessage("Sign-in could not be completed. Please try again."); }
    finally { setBusy(false); }
  };
  return <section className="mx-auto max-w-md px-6 py-20">
    <SEOHead title="Staff sign-in" description="Private staff access for O. Mwendwa & Company Advocates." noindex />
    <LockKeyhole className="mb-5 h-8 w-8 text-primary" />
    <p className="text-sm text-muted-foreground mb-2">O. Mwendwa & Company Advocates</p>
    <h1 className="text-4xl mb-3">{forgot ? "Reset your password" : "Staff sign-in"}</h1>
    <p className="text-muted-foreground mb-8">Rachel & invited staff only.</p>
    <form onSubmit={submit} className="space-y-5">
      <div><Label htmlFor="staff-email">Email address</Label><Input id="staff-email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} /></div>
      {!forgot && <div><Label htmlFor="staff-password">Password</Label><Input id="staff-password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} /></div>}
      <Button className="w-full" disabled={busy || staff.loading} type="submit">{busy ? "Please wait…" : forgot ? "Send reset link" : "Sign in"}</Button>
    </form>
    <p role="status" aria-live="polite" className="my-4 text-sm text-foreground">{message || staff.error}</p>
    {!forgot && <div className="space-y-3 border-t pt-5">
      <Button variant="outline" className="w-full" disabled={busy} onClick={() => void social("google")}>Sign in with Google</Button>
      <Button className="lovable-auth-button w-full" disabled={busy} onClick={() => void social("lovable")}>Sign in with Lovable</Button>
    </div>}
    <Button variant="link" className="px-0 mt-3" onClick={() => { setForgot(!forgot); setMessage(""); }}>{forgot ? "Back to sign-in" : "Forgot password?"}</Button>
    <div className="mt-7"><Button asChild variant="ghost"><Link to="/"><ArrowLeft />Back to the firm</Link></Button></div>
  </section>;
}