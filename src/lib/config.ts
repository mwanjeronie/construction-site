import fs from "fs";
import path from "path";
import type { SiteConfig } from "@/types/config";

const CONFIG_PATH = path.join(process.cwd(), "data", "site-config.json");

export function getSiteConfig(): SiteConfig {
  try {
    const raw = fs.readFileSync(CONFIG_PATH, "utf-8");
    return JSON.parse(raw) as SiteConfig;
  } catch {
    throw new Error("Failed to read site config");
  }
}

export function saveSiteConfig(config: SiteConfig): void {
  const json = JSON.stringify(config, null, 2);
  fs.writeFileSync(CONFIG_PATH, json, "utf-8");
}

export function updateSiteConfig(partial: Partial<SiteConfig>): SiteConfig {
  const current = getSiteConfig();
  const updated = deepMerge(current, partial) as SiteConfig;
  saveSiteConfig(updated);
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
