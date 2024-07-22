import readMarkdownFile from "./markdown/readMarkdown.ts";

export default async function main() {
  console.log(await readMarkdownFile(".lintlint.md"));
}
