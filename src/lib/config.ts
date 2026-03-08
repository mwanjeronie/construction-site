import { supabase } from "@/lib/supabase";
import type { SiteConfig } from "@/types/config";

export async function getSiteConfig(): Promise<SiteConfig> {
  const { data, error } = await supabase
    .from("site_config")
    .select("config")
    .eq("id", 1)
    .single();

  if (error) throw new Error(`Failed to read config: ${error.message}`);
  return data.config as SiteConfig;
}

export async function saveSiteConfig(config: SiteConfig): Promise<void> {
  const { error } = await supabase
    .from("site_config")
    .upsert({ id: 1, config, updated_at: new Date().toISOString() });

  if (error) throw new Error(`Failed to save config: ${error.message}`);
}
