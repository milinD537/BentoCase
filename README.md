# BentoCase

BentoCase is a flexible, interactive bento grid maker that allows you to create and resize customizable grid layouts using resizable components. Powered by [shadcn](https://github.com/shadcn) and integrated with [react-code-blocks](https://github.com/rajinwonderland/react-code-blocks), BentoCase supports dynamic grid structures that can be expanded or split at any level, giving users complete control over grid design and content.

## Features

- **Resizable Grid Panels**: Use shadcn’s resizable component to create panels that adapt to user-specified dimensions.
- **Dynamic Grid Expansion**: Expand or split grid sections with intuitive sibling and split buttons.
- **Auto-generated Grid Preview**: Live preview of the grid structure generated as clean, formatted HTML code.
- **Code Export**: Copy the rendered grid structure as formatted HTML using `pretty` and `react-code-blocks`.
- **Flexible Directions**: Supports horizontal and vertical resizing to create diverse layouts.

## Project Structure

The code organizes the grid-making functionality into three main parts:
- **ResizablePanelGroup and ResizablePanel**: Core components for creating resizable areas in the grid.
- **Dynamic Expansion**: Functions to expand and manage nested grid elements.
- **Code Export**: Generates a formatted HTML preview that users can copy for integration into other projects.

## Usage

To use BentoCase, run the following commands to set up the environment:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/bentocase.git
    cd bentocase
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Run the App**:
    ```bash
    npm run dev
    ```

Access the app at `http://localhost:3000` and start creating your grid layout. Use the buttons within each grid panel to add new sections or split existing ones.

## Components Breakdown

### `ResizablePanelGroup`
Defines the direction of the grid layout and handles resizing events across the layout. Uses either horizontal or vertical resizing based on the panel index.

### `renderItems` & `renderGrid`
Recursively renders each grid element, creating new sub-panels as elements expand. The components also include resize handles to adjust panel size.

### `CopyBlock`
Displays formatted HTML of the current grid layout, making it easy to copy the code into other applications.

## Example Code Output

Here’s an example of the generated code block for the current grid layout:

```html
<div class="bentoWrapper | w-full max-w-screen-2xl aspect-video grid gap-4 overflow-auto">
    <!-- Rendered Grid Layout Here -->
</div>
```

## Tech Stack

- **NextJS**: For building the UI components.
- **shadcn Resizable**: For creating responsive, resizable grid panels.
- **React Code Blocks**: To format and export grid layout code as HTML.
- **Pretty**: To prettify HTML code for easy copy-pasting.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests. 

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

--- 

Let me know if there are other sections you'd like to add!
