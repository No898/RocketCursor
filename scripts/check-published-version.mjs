import { readFile } from "node:fs/promises";
import {
  compareVersions,
  getRegistryPackagePath,
} from "./publish-guard.mjs";

const packageJsonPath = new URL("../package.json", import.meta.url);
const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
const packageName = packageJson.name;
const localVersion = packageJson.version;

const response = await fetch(
  `https://registry.npmjs.org/${getRegistryPackagePath(packageName)}/latest`,
  {
    headers: {
      accept: "application/json",
    },
  }
);

if (response.status === 404) {
  console.log(`Package "${packageName}" is not published on npm yet.`);
  process.exit(0);
}

if (!response.ok) {
  throw new Error(
    `Failed to fetch published version for ${packageName}: ${response.status} ${response.statusText}`
  );
}

const publishedPackage = await response.json();
const publishedVersion = publishedPackage.version;
const comparison = compareVersions(localVersion, publishedVersion);

console.log(`Published latest: ${publishedVersion}`);
console.log(`Local package.json: ${localVersion}`);

if (comparison <= 0) {
  throw new Error(
    `Local version ${localVersion} must be greater than published version ${publishedVersion}.`
  );
}

console.log("Local version is ahead of npm.");
