import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { tmpdir } from "node:os";

const repoRoot = process.cwd();
const rootPackageJson = JSON.parse(
  await readFile(path.join(repoRoot, "package.json"), "utf8")
);
const tempDir = await mkdtemp(path.join(tmpdir(), "rocket-cursor-smoke-"));
const tarballDir = path.join(tempDir, "tarball");
const consumerDir = path.join(tempDir, "consumer");

await mkdir(tarballDir);
await mkdir(consumerDir);

try {
  const packResult = JSON.parse(
    execFileSync("npm", ["pack", "--json", "--pack-destination", tarballDir], {
      cwd: repoRoot,
      encoding: "utf8",
    })
  );
  const tarballPath = path.join(tarballDir, packResult[0].filename);
  const reactVersion = rootPackageJson.devDependencies.react;
  const reactDomVersion = rootPackageJson.devDependencies["react-dom"];
  const reactTypesVersion = rootPackageJson.devDependencies["@types/react"];
  const reactDomTypesVersion = rootPackageJson.devDependencies["@types/react-dom"];
  const typescriptVersion = rootPackageJson.devDependencies.typescript;

  await writeFile(
    path.join(consumerDir, "package.json"),
    JSON.stringify(
      {
        name: "rocket-cursor-smoke",
        private: true,
        type: "module",
      },
      null,
      2
    )
  );

  execFileSync(
    "npm",
    [
      "install",
      "--no-package-lock",
      tarballPath,
      `react@${reactVersion}`,
      `react-dom@${reactDomVersion}`,
      `@types/react@${reactTypesVersion}`,
      `@types/react-dom@${reactDomTypesVersion}`,
      `typescript@${typescriptVersion}`,
    ],
    {
      cwd: consumerDir,
      stdio: "inherit",
    }
  );

  await writeFile(
    path.join(consumerDir, "smoke-require.cjs"),
    `
const React = require("react");
const { renderToString } = require("react-dom/server");
const packageExports = require("rocket-cursor-component");
const RocketCursor = packageExports.default;
const { CursorFollower } = packageExports;

if (typeof CursorFollower !== "function") {
  throw new Error("CommonJS named export smoke test failed.");
}

const rocketHtml = renderToString(React.createElement(RocketCursor));
const followerHtml = renderToString(
  React.createElement(
    CursorFollower,
    null,
    React.createElement("span", null, "Probe")
  )
);

if (!rocketHtml.includes("<svg")) {
  throw new Error("CommonJS smoke test failed.");
}

if (!followerHtml.includes("Probe")) {
  throw new Error("CommonJS generic smoke test failed.");
}
`
  );

  await writeFile(
    path.join(consumerDir, "smoke-import.mjs"),
    `
import React from "react";
import { renderToString } from "react-dom/server";
import RocketCursor, { CursorFollower } from "rocket-cursor-component";

if (typeof CursorFollower !== "function") {
  throw new Error("ESM named export smoke test failed.");
}

const rocketHtml = renderToString(React.createElement(RocketCursor));
const followerHtml = renderToString(
  React.createElement(CursorFollower, null, React.createElement("span", null, "Probe"))
);

if (!rocketHtml.includes("<svg")) {
  throw new Error("ESM smoke test failed.");
}

if (!followerHtml.includes("Probe")) {
  throw new Error("ESM generic smoke test failed.");
}
`
  );

  await writeFile(
    path.join(consumerDir, "smoke-types.tsx"),
    `
import RocketCursor, {
  CursorFollower,
  type CursorFollowerProps,
  type CursorFollowerRenderState,
} from "rocket-cursor-component";

const renderCursorState = ({ isMoving }: CursorFollowerRenderState) => (
  <span>{isMoving ? "moving" : "idle"}</span>
);

const followerProps: CursorFollowerProps = {
  children: renderCursorState,
  wrapperProps: {
    "data-smoke": "ok",
  },
};

export const smokeNodes = (
  <>
    <RocketCursor />
    <CursorFollower {...followerProps} />
  </>
);
`
  );

  execFileSync("node", ["smoke-require.cjs"], {
    cwd: consumerDir,
    stdio: "inherit",
  });
  execFileSync("node", ["smoke-import.mjs"], {
    cwd: consumerDir,
    stdio: "inherit",
  });
  execFileSync(
    path.join(consumerDir, "node_modules", ".bin", "tsc"),
    [
      "--noEmit",
      "--jsx",
      "react-jsx",
      "--module",
      "NodeNext",
      "--moduleResolution",
      "NodeNext",
      "--target",
      "ES2020",
      "smoke-types.tsx",
    ],
    {
      cwd: consumerDir,
      stdio: "inherit",
    }
  );

  console.log("Package smoke test passed.");
} finally {
  await rm(tempDir, { force: true, recursive: true });
}
