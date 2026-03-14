import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import process from "node:process";
import { incrementVersion } from "./publish-guard.mjs";

const SUPPORTED_RELEASE_TYPES = new Set([
  "major",
  "minor",
  "patch",
  "premajor",
  "preminor",
  "prepatch",
  "prerelease",
]);

const cliArgs = process.argv.slice(2);
const releaseType = cliArgs.find((argument) => !argument.startsWith("--"));
const dryRun = cliArgs.includes("--dry-run");
const preidFlagIndex = cliArgs.indexOf("--preid");
const prereleaseLabel =
  preidFlagIndex >= 0 && cliArgs[preidFlagIndex + 1]
    ? cliArgs[preidFlagIndex + 1]
    : "rc";

if (!releaseType || !SUPPORTED_RELEASE_TYPES.has(releaseType)) {
  throw new Error(
    `Usage: node ./scripts/bump-version.mjs <${[...SUPPORTED_RELEASE_TYPES].join("|")}> [--dry-run] [--preid rc]`
  );
}

const packageJsonPath = new URL("../package.json", import.meta.url);
const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
const currentVersion = packageJson.version;
const nextVersion = incrementVersion(currentVersion, releaseType, prereleaseLabel);

console.log(`Version bump (${releaseType}): ${currentVersion} -> ${nextVersion}`);

if (dryRun) {
  process.exit(0);
}

const npmVersionArgs = ["version", releaseType, "--no-git-tag-version"];

if (releaseType.startsWith("pre")) {
  npmVersionArgs.push("--preid", prereleaseLabel);
}

execFileSync("npm", npmVersionArgs, {
  stdio: "inherit",
});

console.log("package.json and package-lock.json updated.");
