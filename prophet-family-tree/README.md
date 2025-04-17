# Prophet Family Tree

This project is a dynamic family tree representation of the Prophet Muhammad ﷺ, created using SVG. The tree is designed to be interactive, allowing users to zoom, pan, and view detailed information about each character through tooltips.

## Project Structure

```
prophet-family-tree
├── src
│   ├── js
│   │   ├── core
│   │   │   ├── tree-renderer.js      # Logic for rendering the family tree in SVG format
│   │   │   ├── tree-layout.js         # Manages the layout of the tree
│   │   │   ├── zoom-controller.js      # Implements zooming and panning functionality
│   │   │   └── tooltip-manager.js      # Handles tooltip creation and display
│   │   ├── data
│   │   │   ├── genealogy-data.js      # Contains lineage data in JSON format
│   │   │   └── data-loader.js         # Responsible for loading genealogy data
│   │   ├── utils
│   │   │   ├── svg-helpers.js         # Utility functions for SVG manipulation
│   │   │   └── browser-compatibility.js # Ensures browser compatibility
│   │   └── app.js                     # Main entry point of the application
│   ├── css
│   │   ├── tree-styles.css            # Styles specific to the family tree
│   │   ├── tooltip-styles.css         # Styles for tooltips
│   │   ├── responsive.css              # Media queries for responsiveness
│   │   └── main.css                   # General styles for the application
│   ├── assets
│   │   ├── icons
│   │   │   ├── male-icon.svg          # SVG icon for male characters
│   │   │   └── female-icon.svg        # SVG icon for female characters
│   │   └── fonts
│   │       └── arabic-font.woff2     # Web font for Arabic text
│   └── index.html                     # Main HTML file
├── lib
│   └── d3.min.js                      # Minified version of D3.js library
├── package.json                       # Configuration file for npm
├── .gitignore                         # Specifies files to ignore by Git
└── README.md                          # Documentation for the project
```

## Features

- **Interactive Family Tree**: Users can explore the lineage of the Prophet Muhammad ﷺ with an interactive SVG representation.
- **Tooltips**: Clickable nodes display tooltips with information about each character.
- **Zoom and Pan**: Users can zoom in and out and pan across the tree for better visibility.
- **Responsive Design**: The tree adapts to different screen sizes for optimal viewing on mobile and desktop devices.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd prophet-family-tree
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Open `src/index.html` in a web browser to view the family tree.

## Usage

- Click on any character node to view detailed information in a tooltip.
- Use mouse scroll or pinch gestures to zoom in and out.
- Click and drag to pan around the family tree.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.