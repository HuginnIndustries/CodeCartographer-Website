import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SITE_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const UPSTREAM_ROOT = resolve(
  process.env.CODECARTO_UPSTREAM || join(SITE_ROOT, "..", "CodeCartographer"),
);

async function read(path) {
  return readFile(path, "utf8");
}

async function htmlFiles() {
  return (await readdir(SITE_ROOT))
    .filter((name) => name.endsWith(".html"))
    .sort();
}

test("every public version label matches the authoritative package version", async () => {
  const pkg = JSON.parse(await read(join(UPSTREAM_ROOT, "package.json")));
  for (const name of await htmlFiles()) {
    const html = await read(join(SITE_ROOT, name));
    assert.doesNotMatch(html, /v0\.8\.0/, `${name} still contains the retired v0.8.0 label`);
    const footer = html.match(/<div class="site-footer-bottom">([\s\S]*?)<\/div>/)?.[1] ?? "";
    assert.match(footer, new RegExp(`v${pkg.version.replaceAll(".", "\\.")}`), `${name} footer must show v${pkg.version}`);
  }
  const index = await read(join(SITE_ROOT, "index.html"));
  assert.match(index, new RegExp(`Reverse-engineering toolkit · v${pkg.version.replaceAll(".", "\\.")}`));
});

test("MCP documentation names every tool registered by the upstream server", async () => {
  const server = await read(join(UPSTREAM_ROOT, "mcp-server", "server.ts"));
  const tools = [...server.matchAll(/name:\s*"(codecarto_[a-z_]+)"/g)].map((match) => match[1]);
  assert.ok(tools.length > 0, "expected to discover MCP tools from upstream server.ts");

  const docs = await read(join(SITE_ROOT, "docs.html"));
  const index = await read(join(SITE_ROOT, "index.html"));
  assert.match(docs, new RegExp(`<h2>${tools.length} tools for any MCP-compatible host\\.<\\/h2>`));
  assert.match(index, new RegExp(`${tools.length} tools`));
  for (const tool of tools) assert.match(docs, new RegExp(`<code>${tool}<\\/code>`), `docs.html omits ${tool}`);
});

test("pipeline selector mirrors the authoritative pipeline variants", async () => {
  const workflowDir = join(UPSTREAM_ROOT, ".codecarto", "workflow");
  const pipelineFiles = (await readdir(workflowDir)).filter((name) => name.startsWith("pipeline") && name.endsWith(".yaml"));
  const features = await read(join(SITE_ROOT, "features.html"));
  assert.equal((features.match(/class="pipeline-tab/g) ?? []).length, pipelineFiles.length);
});

test("continuity copy treats THREAD_LOG as a closeout index, not the durable summary store", async () => {
  const features = await read(join(SITE_ROOT, "features.html"));
  const card = features.match(/<h3[^>]*><code>THREAD_LOG\.md<\/code><\/h3>\s*<p>(.*?)<\/p>/s)?.[1] ?? "";
  assert.match(card, /index/i);
  assert.match(card, /closeout/i);
  assert.doesNotMatch(card, /summary log/i);
});

test("FAQ explains distillation, compaction limits, and delivery-surface responsibility", async () => {
  const features = await read(join(SITE_ROOT, "features.html"));
  assert.match(features, /Frequently asked questions/i);
  assert.match(features, /What happens when.*context.*compact/is);
  assert.match(features, /cross-phase/i);
  assert.match(features, /intra-phase/i);
  assert.match(features, /Pi extension/i);
  assert.match(features, /MCP host/i);
  assert.match(features, /drop-in/i);
});
