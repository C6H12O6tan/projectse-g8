'use client';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from "../../lib/supabase/app-browser";


export default function LoginForm() {
  const router = useRouter();
  const supabase = createBrowserClient();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email'));
    const password = String(form.get('password'));

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
      return;
    }
    // ✅ ไปหน้า validate ให้ server ตัดสินใจว่าจะไป /admin /officer หรือ /teacher
    router.replace('/validate');
  }

  return (
    <form onSubmit={onSubmit}>
      {/* ...input email/password... */}
      <button type="submit">เข้าสู่ระบบ</button>
    </form>
  );
}
