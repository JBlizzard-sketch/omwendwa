import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { StaffRole } from "@/lib/staffRules";

export function useStaff() {
  const [state, setState] = useState<{ loading: boolean; user: User | null; roles: StaffRole[]; error: string }>({ loading: true, user: null, roles: [], error: "" });
  useEffect(() => {
    let active = true;
    let version = 0;
    const load = async () => {
      const request = ++version;
      const { data, error } = await supabase.auth.getUser();
      if (!active || request !== version) return;
      if (error || !data.user) {
        setState({ loading: false, user: null, roles: [], error: "" });
        return;
      }
      const result = await supabase.from("user_roles").select("role").eq("user_id", data.user.id);
      if (active && request === version) setState({ loading: false, user: data.user, roles: result.data?.map(row => row.role) ?? [], error: result.error ? "Staff access could not be checked. Please try again." : "" });
    };
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      // Defer server validation outside the auth callback's lock.
      window.setTimeout(() => { if (active) void load(); }, 0);
    });
    void load();
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, []);
  return state;
}