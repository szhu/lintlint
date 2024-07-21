export default async function prettierPlugins() {
  const { PrettierPlugins } = await import("../../facts/prettierConfig.ts");

  for (const requiredPlugin of [
    "prettier-plugin-jsdoc",
    "prettier-plugin-organize-imports",
    "prettier-plugin-packagejson",
    "prettier-plugin-sort-json",
  ]) {
    const ruleName = `.prettierrc.json: Uses plugin ${requiredPlugin}`;
    if (PrettierPlugins.has(requiredPlugin)) {
      console.info(`✅ ${ruleName}`);
    } else {
      console.info(`❌ ${ruleName}`);
    }
  }
}
