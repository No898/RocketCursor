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
const RocketCursor = require("rocket-cursor-component").default;

const html = renderToString(React.createElement(RocketCursor));

if (!html.includes("<svg")) {
  throw new Error("CommonJS smoke test failed.");
}
`
  );

  await writeFile(
    path.join(consumerDir, "smoke-import.mjs"),
    `
import React from "react";
import { renderToString } from "react-dom/server";
import RocketCursor from "rocket-cursor-component";

const html = renderToString(React.createElement(RocketCursor));

if (!html.includes("<svg")) {
  throw new Error("ESM smoke test failed.");
}
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

  console.log("Package smoke test passed.");
} finally {
  await rm(tempDir, { force: true, recursive: true });
}
