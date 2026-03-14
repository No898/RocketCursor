import { appendFile, readFile } from "node:fs/promises";
import process from "node:process";
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

let shouldPublish = false;
let reason = "";
let publishedVersion = null;

if (response.status === 404) {
  shouldPublish = true;
  reason = "Package is not published on npm yet.";
} else {
  if (!response.ok) {
    throw new Error(
      `Failed to fetch published version for ${packageName}: ${response.status} ${response.statusText}`
    );
  }

  const publishedPackage = await response.json();
  publishedVersion = publishedPackage.version;

  const comparison = compareVersions(localVersion, publishedVersion);

  if (comparison > 0) {
    shouldPublish = true;
    reason = `Local version ${localVersion} is ahead of npm latest ${publishedVersion}.`;
  } else if (comparison === 0) {
    reason = `Local version ${localVersion} already matches npm latest ${publishedVersion}.`;
  } else {
    throw new Error(
      `Local version ${localVersion} is behind npm latest ${publishedVersion}. Bump package.json before releasing.`
    );
  }
}

console.log(`Local package.json: ${localVersion}`);
console.log(
  publishedVersion === null
    ? `npm latest: not published (${packageName})`
    : `npm latest: ${publishedVersion}`
);
console.log(reason);

if (process.env.GITHUB_OUTPUT) {
  await appendFile(
    process.env.GITHUB_OUTPUT,
    `should_publish=${shouldPublish}\nreason=${JSON.stringify(reason)}\n`
  );
}
