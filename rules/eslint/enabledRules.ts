export default async function eslintEnabledRules() {
  const { EslintCalculatedRules } = await import(
    "../../facts/eslintCalculatedConfig.ts"
  );

  for (const rule of ["@typescript-eslint/naming-convention"]) {
    const ruleName = `.eslintrc.json: Config extends ${rule}`;
    const ruleConfig = EslintCalculatedRules[rule];

    if (ruleConfig && ruleConfig[0] === "error") {
      console.info(`✅ ${ruleName}`);
    } else {
      console.info(`❌ ${ruleName}`);
    }
  }
}
