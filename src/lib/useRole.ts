'use client';

import { useEffect, useState } from 'react';

type Role = 'admin' | 'officer' | 'teacher' | 'external' | null;
type RoleResp = { user: { id: string; email: string } | null; role: Role };

export function useRole() {
  const [data, setData] = useState<RoleResp | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const { supabaseBrowser } = await import('@/lib/supabaseBrowser');
        const sb = supabaseBrowser();
        const { data: s } = await sb.auth.getSession();
        const token = s?.session?.access_token;

        const r = await fetch('/api/auth/role', {
          cache: 'no-store',
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const j: RoleResp = await r.json();
        if (!cancel) setData(j);
      } catch (e: any) {
        if (!cancel) setErr(e.message || 'role fetch error');
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, []);

  return { data, loading, error };
}
