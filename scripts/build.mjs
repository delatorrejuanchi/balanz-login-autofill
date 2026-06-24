import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

const supportedBrowsers = new Set(["chrome", "firefox"]);
const browser = process.argv[2];

if (!supportedBrowsers.has(browser)) {
  throw new Error(`Usage: node scripts/build.mjs ${Array.from(supportedBrowsers).join("|")}`);
}

const projectRoot = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(projectRoot, "dist", browser);

await fs.rm(outputDirectory, { force: true, recursive: true });
await fs.mkdir(outputDirectory, { recursive: true });
await fs.copyFile(
  path.join(projectRoot, "manifests", browser, "manifest.json"),
  path.join(outputDirectory, "manifest.json"),
);
await fs.copyFile(
  path.join(projectRoot, "src", "content-script.js"),
  path.join(outputDirectory, "content-script.js"),
);

console.log(`Built ${browser} extension in dist/${browser}`);
