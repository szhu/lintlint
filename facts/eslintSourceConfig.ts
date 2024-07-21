import readJson from "../extends/json/readJson.ts";

console.info(`Reading .eslintrc.json...`);
export const EslintSourceConfig = //
  await readJson<Record<string, any>>(".eslintrc.json");

export const EslintExtends = //
  new Set<string>(EslintSourceConfig?.extends ?? []);
