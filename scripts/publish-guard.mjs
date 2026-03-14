export const EMPTY_TREE_SHA = "4b825dc642cb6eb9a060e54bf8d69288fbee4904";
export const ZERO_SHA = "0000000000000000000000000000000000000000";

const PROTECTED_REMOTE_REFS = new Set(["refs/heads/main", "refs/heads/master"]);
const PUBLISH_RELEVANT_FILES = new Set([
  "LICENSE",
  "README.md",
  "package.json",
  "tsconfig.json",
  "tsup.config.ts",
]);
const PUBLISH_RELEVANT_PREFIXES = ["src/"];

const VERSION_PATTERN =
  /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+([0-9A-Za-z.-]+))?$/;

const comparePrereleaseIdentifiers = (left, right) => {
  const leftNumeric = /^\d+$/.test(left);
  const rightNumeric = /^\d+$/.test(right);

  if (leftNumeric && rightNumeric) {
    return Number(left) - Number(right);
  }

  if (leftNumeric) {
    return -1;
  }

  if (rightNumeric) {
    return 1;
  }

  return left.localeCompare(right);
};

export const parseVersion = (value) => {
  const match = VERSION_PATTERN.exec(value);

  if (!match) {
    return null;
  }

  const [, major, minor, patch, prerelease = ""] = match;

  return {
    major: Number(major),
    minor: Number(minor),
    patch: Number(patch),
    prerelease: prerelease ? prerelease.split(".") : [],
  };
};

export const compareVersions = (left, right) => {
  const leftVersion = parseVersion(left);
  const rightVersion = parseVersion(right);

  if (!leftVersion || !rightVersion) {
    throw new Error(`Unsupported version comparison: "${left}" vs "${right}".`);
  }

  if (leftVersion.major !== rightVersion.major) {
    return leftVersion.major - rightVersion.major;
  }

  if (leftVersion.minor !== rightVersion.minor) {
    return leftVersion.minor - rightVersion.minor;
  }

  if (leftVersion.patch !== rightVersion.patch) {
    return leftVersion.patch - rightVersion.patch;
  }

  const leftPrerelease = leftVersion.prerelease;
  const rightPrerelease = rightVersion.prerelease;

  if (leftPrerelease.length === 0 && rightPrerelease.length === 0) {
    return 0;
  }

  if (leftPrerelease.length === 0) {
    return 1;
  }

  if (rightPrerelease.length === 0) {
    return -1;
  }

  const maxLength = Math.max(leftPrerelease.length, rightPrerelease.length);

  for (let index = 0; index < maxLength; index += 1) {
    const leftPart = leftPrerelease[index];
    const rightPart = rightPrerelease[index];

    if (leftPart === undefined) {
      return -1;
    }

    if (rightPart === undefined) {
      return 1;
    }

    const comparison = comparePrereleaseIdentifiers(leftPart, rightPart);

    if (comparison !== 0) {
      return comparison;
    }
  }

  return 0;
};

export const formatVersion = ({ major, minor, patch, prerelease = [] }) => {
  const stableVersion = `${major}.${minor}.${patch}`;

  if (prerelease.length === 0) {
    return stableVersion;
  }

  return `${stableVersion}-${prerelease.join(".")}`;
};

const getNextPrerelease = (parts, fallbackLabel) => {
  if (parts.length === 0) {
    return [fallbackLabel, "0"];
  }

  const nextParts = [...parts];

  for (let index = nextParts.length - 1; index >= 0; index -= 1) {
    if (/^\d+$/.test(nextParts[index])) {
      nextParts[index] = String(Number(nextParts[index]) + 1);
      return nextParts;
    }
  }

  nextParts.push("0");
  return nextParts;
};

export const incrementVersion = (value, releaseType, prereleaseLabel = "rc") => {
  const parsedVersion = parseVersion(value);

  if (!parsedVersion) {
    throw new Error(`Unsupported version increment: "${value}".`);
  }

  switch (releaseType) {
    case "major":
      return formatVersion({
        major: parsedVersion.major + 1,
        minor: 0,
        patch: 0,
      });
    case "minor":
      return formatVersion({
        major: parsedVersion.major,
        minor: parsedVersion.minor + 1,
        patch: 0,
      });
    case "patch":
      return formatVersion({
        major: parsedVersion.major,
        minor: parsedVersion.minor,
        patch: parsedVersion.patch + 1,
      });
    case "premajor":
      return formatVersion({
        major: parsedVersion.major + 1,
        minor: 0,
        patch: 0,
        prerelease: [prereleaseLabel, "0"],
      });
    case "preminor":
      return formatVersion({
        major: parsedVersion.major,
        minor: parsedVersion.minor + 1,
        patch: 0,
        prerelease: [prereleaseLabel, "0"],
      });
    case "prepatch":
      return formatVersion({
        major: parsedVersion.major,
        minor: parsedVersion.minor,
        patch: parsedVersion.patch + 1,
        prerelease: [prereleaseLabel, "0"],
      });
    case "prerelease":
      return formatVersion({
        major: parsedVersion.major,
        minor: parsedVersion.minor,
        patch:
          parsedVersion.prerelease.length === 0
            ? parsedVersion.patch + 1
            : parsedVersion.patch,
        prerelease: getNextPrerelease(parsedVersion.prerelease, prereleaseLabel),
      });
    default:
      throw new Error(`Unsupported release type "${releaseType}".`);
  }
};

export const parsePrePushLines = (input) =>
  input
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [localRef, localSha, remoteRef, remoteSha] = line.split(/\s+/);

      return {
        localRef,
        localSha,
        remoteRef,
        remoteSha,
      };
    });

export const isProtectedPushTarget = ({ remoteRef, localSha }) =>
  PROTECTED_REMOTE_REFS.has(remoteRef) && localSha !== ZERO_SHA;

export const normalizeDiffBase = (remoteSha) =>
  remoteSha === ZERO_SHA ? EMPTY_TREE_SHA : remoteSha;

export const isPublishRelevantFile = (path) =>
  PUBLISH_RELEVANT_FILES.has(path) ||
  PUBLISH_RELEVANT_PREFIXES.some((prefix) => path.startsWith(prefix));

export const hasPublishRelevantChanges = (paths) =>
  paths.some((path) => isPublishRelevantFile(path));

export const getRegistryPackagePath = (packageName) =>
  packageName
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
