import { NextResponse } from "next/server";
import { supabaseFromRequest } from "@/lib/supabase/route";

export async function GET(request: Request) {
  const { client } = supabaseFromRequest(request as any);
  const { data: me } = await client.auth.getUser();
  if (!me?.user) return NextResponse.json({ message: "unauthorized" }, { status: 401 });

  // ตรวจ role admin ในโปรไฟล์ (ถ้าต้องการ)
  const { data: myProfile } = await client.from("profiles").select("role").eq("id", me.user.id).single();
  if (myProfile?.role !== "admin") return NextResponse.json({ message: "forbidden" }, { status: 403 });

  const { data, error } = await client
    .from("profiles")
    .select("id,email,display_name,fullname,phone,created_at")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ message: error.message }, { status: 400 });
  return NextResponse.json(data ?? []);
}
