# Rocket Cursor Component

A React cursor library with a built-in animated rocket and a generic `CursorFollower` for custom visuals.

## Installation

Install the package via npm:

```bash
npm install rocket-cursor-component
```

## Requirements

- **React 18+** or **React 19+**
- **React DOM 18+** or **React DOM 19+**
- Node.js 20.19+ or 22.12+ for local development in this repository

> The published package ships prebuilt ESM and CommonJS entry points, so consumers only need a compatible React app toolchain.

## Usage

### Built-in rocket

Use the default export when you want the packaged rocket visuals:

```tsx
import React from "react";
import RocketCursor from "rocket-cursor-component";

function App() {
  return (
    <div>
      <h1>Your app content here</h1>
      {/* Basic usage - rocket replaces cursor */}
      <RocketCursor />

      {/* Tuned usage - visible system cursor, snappier follow */}
      <RocketCursor
        size={60}
        threshold={12}
        flameHideTimeout={250}
        hideCursor={false}   // keep native cursor visible
        followSpeed={0.35}   // 0-1, higher = snappier
        excludeSelector=".no-rocket-cursor, [data-hide-rocket]"
        zIndex={1200}
      />
    </div>
  );
}

export default App;
```

### `RocketCursor` props

| Prop               | Type    | Default | Description                                                |
| ------------------ | ------- | ------- | ---------------------------------------------------------- |
| `className`        | string  | `undefined` | Optional class passed to the rocket wrapper.             |
| `disabled`         | boolean | `false` | Disables the custom cursor entirely.                       |
| `disableOnCoarsePointer` | boolean | `true` | Automatically disables the cursor on touch/coarse pointers. |
| `excludeSelector`  | string  | `".no-rocket-cursor"` | CSS selector for regions where the rocket should hide. |
| `respectReducedMotion` | boolean | `true` | Disables the rocket when the user prefers reduced motion. |
| `size`             | number  | `50`    | The size of the rocket cursor in pixels.                   |
| `threshold`        | number  | `10`    | Minimum distance (pixels) to move before the rocket rotates. |
| `isVisible`        | boolean | `true`  | Initial visibility state of the rocket cursor.             |
| `flameHideTimeout` | number  | `300`   | Time in milliseconds before the flame hides after stopping.|
| `hideCursor`       | boolean | `false` | Whether to hide the normal cursor (true) or show both.     |
| `followSpeed`      | number  | `0.18`  | Follow smoothing (0-1). Higher = faster/snappier following. |
| `zIndex`           | number  | `9999`  | Wrapper stacking order for the rocket cursor.              |

### Build your own cursor

Use the named `CursorFollower` export when you want the motion engine without the rocket art:

```tsx
import { CursorFollower } from "rocket-cursor-component";

function CometCursor({ isMoving }: { isMoving: boolean }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "4%",
          top: "50%",
          width: "58%",
          height: "34%",
          borderRadius: 999,
          filter: "blur(12px)",
          opacity: isMoving ? 1 : 0.58,
          transform: `translateY(-50%) scaleX(${isMoving ? 1 : 0.76})`,
          transformOrigin: "center right",
          transition: "opacity 140ms ease, transform 140ms ease",
          background:
            "linear-gradient(90deg, rgba(92,198,196,0), rgba(92,198,196,0.24) 26%, rgba(118,171,255,0.65) 62%, rgba(255,214,146,0.98))",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "14%",
          top: "50%",
          width: "34%",
          aspectRatio: "1 / 1",
          borderRadius: "50%",
          transform: "translateY(-50%)",
          background:
            "radial-gradient(circle at 35% 35%, #fff8ef 0 12%, #ffd170 26%, #ff8b5c 56%, #73b9ff 100%)",
          boxShadow:
            "0 0 22px rgba(255, 181, 115, 0.45), 0 0 42px rgba(115, 185, 255, 0.28)",
        }}
      />
    </div>
  );
}

function App() {
  return (
    <CursorFollower
      anchorOffset={{ x: 14, y: 0 }}
      followSpeed={0.22}
      width={72}
      height={48}
      movingTimeout={220}
    >
      {({ isMoving }) => <CometCursor isMoving={isMoving} />}
    </CursorFollower>
  );
}
```

### `CursorFollower` props

`CursorFollower` includes the shared props from `RocketCursor` (`className`, `disabled`, `disableOnCoarsePointer`, `excludeSelector`, `followSpeed`, `hideCursor`, `isVisible`, `respectReducedMotion`, `threshold`, `zIndex`) and adds:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `anchorOffset` | `{ x: number; y: number }` | `{ x: 0, y: 0 }` | Shifts the cursor anchor inside your artwork. |
| `children` | `ReactNode \| (state) => ReactNode` | required | Static content or a render function that receives `{ isMoving, visible }`. |
| `movingTimeout` | `number` | `300` | Delay before `isMoving` flips back to `false`. |
| `rotateWithMovement` | `boolean` | `true` | Rotates the content in the direction of travel. |
| `rotationOffset` | `number` | `0` | Adds a fixed angle offset for artwork that points somewhere other than right. |
| `width` | `number` | `48` | Wrapper width in pixels. |
| `height` | `number` | `48` | Wrapper height in pixels. |
| `wrapperProps` | `HTMLAttributes<HTMLDivElement>` | `undefined` | Extra attributes for the fixed wrapper, including `data-*` hooks. |

## Features

- **React 18+ Compatible**: Works with modern React 18 and React 19 applications
- **Generic Motion Engine**: Export `CursorFollower` to plug in your own SVG, HTML, or CSS-based cursor visuals
- **Dual Cursor Mode**: Choose to replace cursor completely or show rocket alongside normal cursor
- **Custom Cursor**: Replaces the default mouse cursor with a rocket that follows the cursor and aligns its nose to the pointer
- **Smart Rotation**: The rocket rotates in the direction of cursor movement with configurable threshold
- **Flame Effect**: Dynamic flame animation when the cursor is moving
- **Collision-Free**: Uses React's `useId()` to prevent SVG gradient ID collisions
- **Customizable**: Easily adjust size, rotation threshold, visibility, positioning, and flame duration
- **Accessible Defaults**: Respects reduced-motion users and disables itself on coarse pointers by default
- **Element-Specific Visibility**: Automatically hides the rocket cursor over elements matching your `excludeSelector`
- **Performance Optimized**: Uses `requestAnimationFrame` and hardware acceleration for smooth animations
- **TypeScript**: Full TypeScript support with proper type definitions

## Development

```bash
nvm use
npm install
npm run demo
```

Useful maintenance commands:

```bash
npm run typecheck
npm run test
npm run test:package
npm run build
npm run check
```

CI and release workflows use the version pinned in `.nvmrc`.

## Release

Push a tag in the format `vX.Y.Z` after updating `package.json`, or trigger the release workflow manually.

The release workflow expects an `NPM_TOKEN` repository secret with publish access.

## Demo

Here's a demo of the Rocket Cursor in action:

![Rocket Cursor Demo](https://github.com/No898/RocketCursor/raw/main/assets/rocket-cursor-demo.gif)

> Local demo (not published to npm): run `npm install` and `npm run demo`, then open the Vite dev server printed in the console.

## Changelog

### Unreleased
- **NEW**: Exported `CursorFollower` for custom cursor visuals
- **NEW**: Added generic API smoke coverage and demo mode for a custom comet cursor

### 2.1.0
- **NEW**: Added `followSpeed` prop for configurable smoothing (nose snaps to cursor when close)
- **Changed**: Rocket aligns by its nose to the cursor position (manual offsets removed)
- **Changed**: Demo cleaned up to match the new API (no offset sliders)

### 2.1.1
- **Fixed**: Flame visibility now updates reliably

### 2.0.0 (React 19+ Only)
- **BREAKING**: Now requires React 19.0.0 or higher
- **NEW**: Added `useId()` for unique SVG gradient IDs (prevents collisions)
- **NEW**: Added `hideCursor` prop for dual cursor mode
- **NEW**: Added `offsetX` and `offsetY` props for precise positioning
- Fixed all TypeScript type issues and removed unnecessary type casting
- Improved performance with better dependency management
- Removed unused props (`followDistance`, `followSpeed`)
- Added SSR safety checks for `window` object
- Enhanced code structure with React 19 best practices

### 1.1.1
- Fixed a typo in README.md.

### 1.1.0 
- Refactored SVG into separate components.
- Added `flameHideTimeout` prop for configurable flame duration.
- Improved code structure and efficiency.

### 1.0.9

- Added support to hide the Rocket Cursor on elements with the class `no-rocket-cursor`.

### 1.0.2

- Added demo GIF in the README file.

### 1.0.1

- Initial release of the Rocket Cursor component.

## Author

[No898](https://github.com/No898)

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
