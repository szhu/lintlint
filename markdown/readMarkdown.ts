import { unified } from "npm:unified";
import parseMarkdown from "npm:remark-parse";
import * as remark2html from "npm:remark-html";
import * as parseHtml from "npm:rehype-parse";
import * as rehype2html from "npm:rehype-stringify";
import * as sanitizeHtml from "npm:rehype-sanitize";
import * as gh from "npm:hast-util-sanitize/lib/github";

export default async function readMarkdownFile(path: string) {
  let text;
  try {
    text = await Deno.readTextFile(path);
  } catch (e) {
    return undefined;
  }

  return unified()
    .use(parseMarkdown, {
      commonmark: true,
    })
    .parse(text);
}
