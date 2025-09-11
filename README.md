# Rocket Cursor Component

A customizable React 19+ component that replaces the mouse cursor with an animated rocket that rotates based on movement and displays a flame effect when in motion.

## Installation

Install the package via npm:

```bash
npm install rocket-cursor-component
```

## Requirements

- **React >= 19.0.0** (Required)
- **React DOM >= 19.0.0** (Required)  
- Node.js >= 16.0.0

> This package is built specifically for React 19+ and uses the latest React features including `useId()` for better performance and collision prevention.

## Usage

Here's an example of how to use the `RocketCursor` component in your React app:

```tsx
import React from "react";
import RocketCursor from "rocket-cursor-component"; 

function App() {
  return (
    <div>
      <h1>Your app content here</h1>
      {/* Basic usage - cursor replaced with rocket */}
      <RocketCursor />
      
      {/* Advanced usage - rocket centered on cursor with normal cursor visible */}
      <RocketCursor 
        size={60} 
        threshold={15} 
        flameHideTimeout={300}
        hideCursor={false}  // Keep normal cursor visible
        offsetX={-15}       // Fine-tune rocket position
        offsetY={0}
      />
    </div>
  );
}

export default App;
```

### Props

| Prop               | Type    | Default | Description                                                |
| ------------------ | ------- | ------- | ---------------------------------------------------------- |
| `size`             | number  | `50`    | The size of the rocket cursor in pixels.                   |
| `threshold`        | number  | `10`    | Minimum distance (pixels) to move before the rocket rotates. |
| `isVisible`        | boolean | `true`  | Initial visibility state of the rocket cursor.             |
| `flameHideTimeout` | number  | `300`   | Time in milliseconds before the flame hides after stopping.|
| `hideCursor`       | boolean | `false` | Whether to hide the normal cursor (true) or show both.     |
| `offsetX`          | number  | `-15`   | Horizontal offset in pixels from cursor position.          |
| `offsetY`          | number  | `0`     | Vertical offset in pixels from cursor position.            |

## Features

- **React 19+ Optimized**: Built specifically for React 19+ with latest performance optimizations
- **Dual Cursor Mode**: Choose to replace cursor completely or show rocket alongside normal cursor
- **Custom Cursor**: Replaces the default mouse cursor with a rocket that follows the cursor
- **Smart Rotation**: The rocket rotates in the direction of cursor movement with configurable threshold
- **Flame Effect**: Dynamic flame animation when the cursor is moving
- **Collision-Free**: Uses React 19's `useId()` to prevent SVG gradient ID collisions
- **Customizable**: Easily adjust size, rotation threshold, visibility, positioning, and flame duration
- **Element-Specific Visibility**: Automatically hides the rocket cursor over elements with the class `no-rocket-cursor`
- **Performance Optimized**: Uses `requestAnimationFrame` and hardware acceleration for smooth animations
- **TypeScript**: Full TypeScript support with proper type definitions

## Demo

Here's a demo of the Rocket Cursor in action:

![Rocket Cursor Demo](https://github.com/No898/RocketCursor/raw/main/assets/rocket-cursor-demo.gif)

## Changelog

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
