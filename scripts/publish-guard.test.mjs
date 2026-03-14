import { describe, expect, it } from "vitest";
import {
  compareVersions,
  hasPublishRelevantChanges,
  isProtectedPushTarget,
  parsePrePushLines,
} from "./publish-guard.mjs";

describe("publish guard helpers", () => {
  it("compares semver versions", () => {
    expect(compareVersions("2.1.2", "2.1.1")).toBeGreaterThan(0);
    expect(compareVersions("2.1.1", "2.1.1")).toBe(0);
    expect(compareVersions("2.1.1", "2.1.2")).toBeLessThan(0);
  });

  it("treats stable releases as newer than prereleases", () => {
    expect(compareVersions("2.1.1", "2.1.1-beta.1")).toBeGreaterThan(0);
    expect(compareVersions("2.1.1-beta.2", "2.1.1-beta.1")).toBeGreaterThan(0);
  });

  it("parses pre-push stdin lines", () => {
    expect(
      parsePrePushLines(
        "refs/heads/main abc123 refs/heads/main def456\nrefs/heads/feature 111 refs/heads/feature 222\n"
      )
    ).toEqual([
      {
        localRef: "refs/heads/main",
        localSha: "abc123",
        remoteRef: "refs/heads/main",
        remoteSha: "def456",
      },
      {
        localRef: "refs/heads/feature",
        localSha: "111",
        remoteRef: "refs/heads/feature",
        remoteSha: "222",
      },
    ]);
  });

  it("detects protected branch pushes", () => {
    expect(
      isProtectedPushTarget({
        localRef: "refs/heads/main",
        localSha: "abc123",
        remoteRef: "refs/heads/main",
        remoteSha: "def456",
      })
    ).toBe(true);

    expect(
      isProtectedPushTarget({
        localRef: "refs/heads/feature",
        localSha: "abc123",
        remoteRef: "refs/heads/feature",
        remoteSha: "def456",
      })
    ).toBe(false);
  });

  it("only flags publish-relevant file changes", () => {
    expect(hasPublishRelevantChanges(["demo/main.tsx"])).toBe(false);
    expect(hasPublishRelevantChanges(["README.md"])).toBe(true);
    expect(hasPublishRelevantChanges(["src/index.ts"])).toBe(true);
  });
});
