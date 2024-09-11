Rocket Cursor
A customizable React component that replaces the mouse cursor with an animated rocket that rotates based on movement and displays a flame effect when in motion.

Features
Custom Cursor: Replaces the default cursor with a rocket that follows the mouse.
Rotation: The rocket rotates in the direction of the mouse movement.
Flame Effect: A flame appears when the mouse is moving.
Customizable:
size (default: 50): Adjust the size of the rocket.
threshold (default: 10): Control how sensitive the rocket is to movement for rotation.
isVisible (default: true): Toggle the visibility of the rocket.
Installation
If you publish it as an npm package:

bash
Zkopírovat kód
npm install rocket-cursor-component
Otherwise, clone the repository and use it directly in your project.

Usage
Here’s a basic example of how to use the Rocket Cursor component in your React app:

jsx
Zkopírovat kód
import RocketCursor from 'rocket-cursor-component'; // or the relative path if using locally

function App() {
return (
<div>
{/_ Your app content _/}
<RocketCursor size={60} threshold={15} />
</div>
);
}

export default App;
Props
Prop Type Default Description
size number 50 The size of the rocket cursor
threshold number 10 Distance to move before the rocket rotates
isVisible boolean true Show or hide the rocket cursor
License
This project is licensed under the MIT License. See the LICENSE file for details.

Author
No898
