import { parse } from "https://deno.land/std@0.181.0/jsonc/mod.ts";

export default async function readJson<T = unknown>(path: string) {
  let text;
  try {
    text = await Deno.readTextFile(path);
  } catch (e) {
    return undefined;
  }

  return parse(text) as T;
}
