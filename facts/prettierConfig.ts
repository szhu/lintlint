import readJson from "../extends/json/readJson.ts";

console.info(`Reading .prettierrc.json...`);
export const PrettierConfig = //
  await readJson<Record<string, any>>(".prettierrc.json");

export const PrettierPlugins = //
  new Set<string>(PrettierConfig?.plugins ?? []);
