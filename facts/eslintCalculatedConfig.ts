import { ESLint } from "npm:eslint";

const Levels = ["off", "warn", "error"] as const;
type Level = (typeof Levels)[number];

function normalizeLevel(level: number | Level): Level {
  if (typeof level === "number") {
    return Levels[level];
  } else {
    return level;
  }
}

console.info(`Calculating ESLint config...`);
const eslint = new ESLint();
export const EslintCalculatedConfig = //
  await eslint.calculateConfigForFile("package.json");

export const EslintCalculatedRules = Object.fromEntries(
  Object.entries(EslintCalculatedConfig.rules).flatMap(([rule, value]) => {
    if (!Array.isArray(value)) throw new Error("Invalid format");

    const [rawLevel, ...ruleConfig] = value;
    const level = normalizeLevel(rawLevel);
    if (level === "off") return [];

    return [[rule, [level, ...ruleConfig]]];
  })
);
