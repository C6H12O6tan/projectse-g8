import { redirect } from 'next/navigation';
import { supabaseRSCClient } from "../../lib/supabase/app-rsc";


export default async function Validate() {
  const supabase = await supabaseRSCClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, fullname, email')
    .eq('id', user.id)
    .single();

  // default: teacher
  const role = profile?.role ?? 'teacher';

  if (role === 'admin')   redirect('/admin');
  if (role === 'officer') redirect('/officer');
  redirect('/teacher');
}
