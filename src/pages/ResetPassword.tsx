import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SEOHead from "@/components/SEOHead";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [valid, setValid] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const recovery = hash.get("type") === "recovery" || hash.get("type") === "invite";
    let active = true;
    const check = async () => {
      const { data } = await supabase.auth.getUser();
      if (active && recovery && data.user) setValid(true);
    };
    const { data } = supabase.auth.onAuthStateChange(event => {
      if (event === "PASSWORD_RECOVERY" || (event === "SIGNED_IN" && recovery)) window.setTimeout(() => { if (active) void check(); }, 0);
    });
    void check();
    return () => { active = false; data.subscription.unsubscribe(); };
  }, []);
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!valid) return;
    if (password !== confirm) { setMessage("The passwords do not match."); return; }
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) setMessage(error.message); else navigate("/staff", { replace: true });
    } catch { setMessage("Your password could not be updated. Please try again."); }
    finally { setBusy(false); }
  };
  return <section className="max-w-md mx-auto px-6 py-20">
    <SEOHead title="Set your password" description="Secure password recovery for invited staff." noindex />
    <h1 className="text-4xl mb-6">Set your password</h1>
    {valid ? <form className="space-y-5" onSubmit={submit}>
      <div><Label htmlFor="new-password">New password</Label><Input id="new-password" type="password" minLength={12} required autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} /></div>
      <div><Label htmlFor="confirm-password">Confirm password</Label><Input id="confirm-password" type="password" minLength={12} required autoComplete="new-password" value={confirm} onChange={e => setConfirm(e.target.value)} /></div>
      <Button type="submit" disabled={busy}>{busy ? "Saving…" : "Save password"}</Button>
    </form> : <p className="text-muted-foreground">Open the secure link in your invitation or password reset email to continue.</p>}
    <p role="status" className="my-5">{message}</p>
    <Button asChild variant="link"><Link to="/staff/login">Back to staff sign-in</Link></Button>
  </section>;
}