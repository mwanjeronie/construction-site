import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import type { SiteConfig } from "@/types/config";

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return (
    url && key &&
    !url.includes("your-project-ref") &&
    !key.includes("your-service-role-key")
  );
}

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key);
}

function getLocalConfig(): SiteConfig {
  const CONFIG_PATH = path.join(process.cwd(), "data", "site-config.json");
  const raw = fs.readFileSync(CONFIG_PATH, "utf-8");
  return JSON.parse(raw) as SiteConfig;
}

export async function getSiteConfig(): Promise<SiteConfig> {
  if (!isSupabaseConfigured()) return getLocalConfig();

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("site_config")
    .select("config")
    .eq("id", 1)
    .single();

  if (error) throw new Error(`Failed to read site config: ${error.message}`);
  return data.config as SiteConfig;
}

export async function saveSiteConfig(config: SiteConfig): Promise<void> {
  if (!isSupabaseConfigured()) {
    const CONFIG_PATH = path.join(process.cwd(), "data", "site-config.json");
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8");
    return;
  }

  const supabase = getSupabaseClient();
  const { error } = await supabase
    .from("site_config")
    .update({ config, updated_at: new Date().toISOString() })
    .eq("id", 1);

  if (error) throw new Error(`Failed to save site config: ${error.message}`);
}

export async function updateSiteConfig(
  partial: Partial<SiteConfig>
): Promise<SiteConfig> {
  const current = await getSiteConfig();
  const updated = deepMerge(current, partial) as SiteConfig;
  await saveSiteConfig(updated);
  return updated;
}

function deepMerge(target: unknown, source: unknown): unknown {
  if (
    source &&
    typeof source === "object" &&
    !Array.isArray(source) &&
    target &&
    typeof target === "object" &&
    !Array.isArray(target)
  ) {
    const result = { ...(target as Record<string, unknown>) };
    for (const key of Object.keys(source as Record<string, unknown>)) {
      const srcVal = (source as Record<string, unknown>)[key];
      const tgtVal = (target as Record<string, unknown>)[key];
      result[key] = deepMerge(tgtVal, srcVal);
    }
    return result;
  }
  return source !== undefined ? source : target;
}
