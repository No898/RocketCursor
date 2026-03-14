import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import process from "node:process";
import {
  compareVersions,
  getRegistryPackagePath,
  hasPublishRelevantChanges,
  isProtectedPushTarget,
  normalizeDiffBase,
  parsePrePushLines,
} from "./publish-guard.mjs";

const packageJsonPath = new URL("../package.json", import.meta.url);
const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
const stdin = await new Promise((resolve) => {
  let output = "";
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", (chunk) => {
    output += chunk;
  });
  process.stdin.on("end", () => resolve(output));
});
const pushTargets = parsePrePushLines(stdin);
const protectedTargets = pushTargets.filter((target) => isProtectedPushTarget(target));

if (protectedTargets.length === 0) {
  process.exit(0);
}

const changedFiles = new Set();

for (const target of protectedTargets) {
  const diffBase = normalizeDiffBase(target.remoteSha);
  const diffOutput = execFileSync(
    "git",
    ["diff", "--name-only", diffBase, target.localSha],
    {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "inherit"],
    }
  );

  diffOutput
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((path) => changedFiles.add(path));
}

if (!hasPublishRelevantChanges([...changedFiles])) {
  console.log(
    "Pre-push publish guard: no publish-relevant files changed for this main/master push."
  );
  process.exit(0);
}

const response = await fetch(
  `https://registry.npmjs.org/${getRegistryPackagePath(packageJson.name)}/latest`,
  {
    headers: {
      accept: "application/json",
    },
  }
);

if (response.status === 404) {
  console.log(
    `Pre-push publish guard: package "${packageJson.name}" is not published yet. Allowing push.`
  );
  process.exit(0);
}

if (!response.ok) {
  throw new Error(
    `Pre-push publish guard failed to fetch npm metadata: ${response.status} ${response.statusText}`
  );
}

const publishedPackage = await response.json();
const publishedVersion = publishedPackage.version;
const comparison = compareVersions(packageJson.version, publishedVersion);

console.log(`Pre-push publish guard: published latest is ${publishedVersion}.`);
console.log(`Pre-push publish guard: local package.json version is ${packageJson.version}.`);

if (comparison <= 0) {
  throw new Error(
    `Push to main/master is blocked because publish-relevant files changed while local version ${packageJson.version} is not ahead of published npm version ${publishedVersion}. Bump package.json before pushing.`
  );
}

console.log("Pre-push publish guard: local version is ahead of npm. Allowing push.");
