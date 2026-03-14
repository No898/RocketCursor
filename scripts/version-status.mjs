import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import process from "node:process";
import {
  compareVersions,
  getRegistryPackagePath,
} from "./publish-guard.mjs";

const args = new Set(process.argv.slice(2));
const requireAhead = args.has("--require-ahead");
const publishedOnly = args.has("--published-only");

const packageJsonPath = new URL("../package.json", import.meta.url);
const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
const localVersion = packageJson.version;

const describeComparison = (left, right) => {
  const comparison = compareVersions(left, right);

  if (comparison > 0) {
    return "ahead";
  }

  if (comparison < 0) {
    return "behind";
  }

  return "equal";
};

const readVersionFromRef = (ref) => {
  try {
    const packageJsonSource = execFileSync("git", ["show", `${ref}:package.json`], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });

    const refPackageJson = JSON.parse(packageJsonSource);
    return refPackageJson.version ?? null;
  } catch {
    return null;
  }
};

const readLatestTagVersion = () => {
  try {
    const output = execFileSync(
      "git",
      ["tag", "--list", "v*", "--sort=-version:refname"],
      {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }
    );
    const [latestTag] = output
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (!latestTag) {
      return null;
    }

    return latestTag.startsWith("v") ? latestTag.slice(1) : latestTag;
  } catch {
    return null;
  }
};

const fetchPublishedVersion = async (packageName) => {
  const response = await fetch(
    `https://registry.npmjs.org/${getRegistryPackagePath(packageName)}/latest`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Failed to fetch published version for ${packageName}: ${response.status} ${response.statusText}`
    );
  }

  const publishedPackage = await response.json();
  return publishedPackage.version;
};

const reportLines = [
  `Local package.json: ${localVersion}`,
];
const blockingEntries = [];

if (!publishedOnly) {
  const baseRef =
    readVersionFromRef("origin/main") !== null
      ? "origin/main"
      : readVersionFromRef("origin/master") !== null
        ? "origin/master"
        : null;

  if (baseRef) {
    const baseVersion = readVersionFromRef(baseRef);

    reportLines.push(
      `${baseRef}: ${baseVersion} (${describeComparison(localVersion, baseVersion)})`
    );
  } else {
    reportLines.push("origin/main|master: unavailable");
  }

  const latestTagVersion = readLatestTagVersion();

  if (latestTagVersion) {
    const relationship = describeComparison(localVersion, latestTagVersion);
    reportLines.push(`Latest git tag: ${latestTagVersion} (${relationship})`);
    blockingEntries.push({
      label: "latest git tag",
      version: latestTagVersion,
      relationship,
    });
  } else {
    reportLines.push("Latest git tag: none");
  }
}

const publishedVersion = await fetchPublishedVersion(packageJson.name);

if (publishedVersion) {
  const relationship = describeComparison(localVersion, publishedVersion);
  reportLines.push(`npm latest: ${publishedVersion} (${relationship})`);
  blockingEntries.push({
    label: "npm latest",
    version: publishedVersion,
    relationship,
  });
} else {
  reportLines.push(`npm latest: not published (${packageJson.name})`);
}

reportLines.forEach((line) => console.log(line));

if (!requireAhead) {
  process.exit(0);
}

const failures = blockingEntries.filter(({ relationship }) => relationship !== "ahead");

if (failures.length > 0) {
  throw new Error(
    failures
      .map(
        ({ label, version }) =>
          `Local version ${localVersion} must be ahead of ${label} ${version}.`
      )
      .join("\n")
  );
}

console.log("Local version is ahead of all release checkpoints.");
