import eslintEnabledRules from "./rules/eslint/enabledRules.ts";
import eslintExtends from "./rules/eslint/extends.ts";
import prettierPlugins from "./rules/prettier/plugins.ts";

export default async function main() {
  await prettierPlugins();
  await eslintExtends();
  await eslintEnabledRules();
}
