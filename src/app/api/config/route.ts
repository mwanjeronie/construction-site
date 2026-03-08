import { NextRequest, NextResponse } from "next/server";
import { getSiteConfig, saveSiteConfig } from "@/lib/config";
import { getSession } from "@/lib/session";
import type { SiteConfig } from "@/types/config";

export const dynamic = "force-dynamic";

const NO_CACHE = { "Cache-Control": "no-store, no-cache, must-revalidate" };

export async function GET() {
  try {
    const config = await getSiteConfig();
    return NextResponse.json(config, { headers: NO_CACHE });
  } catch (err) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    return NextResponse.json(
      {
        error: "Failed to load config",
        detail: err instanceof Error ? err.message : String(err),
        supabase_url_prefix: url ? url.slice(0, 30) : "NOT SET",
      },
      { status: 500, headers: NO_CACHE }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as Partial<SiteConfig>;
    const current = await getSiteConfig();
    const updated: SiteConfig = { ...current, ...body };
    await saveSiteConfig(updated);

    return NextResponse.json({ success: true, config: updated });
  } catch (err) {
    console.error("Config update error:", err);
    return NextResponse.json(
      { error: "Failed to save config" },
      { status: 500 }
    );
  }
}
