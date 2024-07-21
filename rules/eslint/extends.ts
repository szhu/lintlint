export default async function eslintExtends() {
  const { EslintExtends } = await import("../../facts/eslintSourceConfig.ts");

  for (const requiredBase of [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:consistent-default-export-name/fixed",
    "plugin:unicorn/recommended",
    "prettier",
  ]) {
    const ruleName = `.eslintrc.json: Config extends ${requiredBase}`;
    if (EslintExtends.has(requiredBase)) {
      console.info(`✅ ${ruleName}`);
    } else {
      console.info(`❌ ${ruleName}`);
    }
  }
}
