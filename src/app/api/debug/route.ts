import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

  const info: Record<string, unknown> = {
    url_set: !!url,
    key_set: !!key,
    url_prefix: url.slice(0, 40),
    url_length: url.length,
    key_length: key.length,
  };

  try {
    const client = createClient(url, key);
    const { data, error } = await client
      .from("site_config")
      .select("config->>company_name, updated_at")
      .eq("id", 1)
      .single();

    info.supabase_query_error = error?.message ?? null;
    info.supabase_company_name = data?.company_name ?? null;
    info.supabase_updated_at = data?.updated_at ?? null;
  } catch (e) {
    info.supabase_exception = e instanceof Error ? e.message : String(e);
  }

  return NextResponse.json(info, {
    headers: { "Cache-Control": "no-store" },
  });
}
