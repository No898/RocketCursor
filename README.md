# Rocket Cursor Component

A customizable React component that replaces the mouse cursor with an animated rocket that rotates based on movement and displays a flame effect when in motion.

## Installation

Install the package via npm:

```bash
npm install rocket-cursor-component
```

## Usage

Here's an example of how to use the `RocketCursor` component in your React app:

```jsx
import React from "react";
import RocketCursor from "rocket-cursor-component";

function App() {
  return (
    <div>
      <h1>Your app content here</h1>
      <RocketCursor size={60} threshold={15} />
    </div>
  );
}

export default App;
```

### Props

| Prop        | Type    | Default | Description                                |
| ----------- | ------- | ------- | ------------------------------------------ |
| `size`      | number  | `50`    | The size of the rocket cursor              |
| `threshold` | number  | `10`    | Distance to move before the rocket rotates |
| `isVisible` | boolean | `true`  | Show or hide the rocket cursor             |

## Features

- **Custom Cursor**: Replaces the default mouse cursor with a rocket that follows the cursor.
- **Rotation**: The rocket rotates in the direction of the cursor movement.
- **Flame Effect**: The rocket displays a flame animation when the cursor is moving.
- **Customizable**: Easily adjust the size, rotation threshold, and visibility of the rocket.
- **Element-Specific Visibility**: Automatically hides the rocket cursor over elements with the class `no-rocket-cursor`.

## Demo

Here’s a demo of the Rocket Cursor in action:

![Rocket Cursor Demo](https://github.com/No898/RocketCursor/raw/main/assets/rocket-cursor-demo.gif)

## Changelog

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
