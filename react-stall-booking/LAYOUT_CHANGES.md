# Exhibition Hall Stall Layout Documentation

This document provides a comprehensive list and technical breakdown of the updated exhibition stall layout, detailing which stalls are paired, grouped as triple units, or configured as single units.

---

## 1. Overview of Layout Areas

The floor plan layout is divided into seven main sections:
1. **Leftmost Column (Column 0)**: Spans vertically on the far-left edge.
2. **Top Row**: Spans horizontally across the top boundary.
3. **Middle Clusters (2x2 blocks)**: Four repeating central grid blocks.
4. **Bottom Row**: Spans horizontally across the bottom boundary.
5. **Aisle 1 Column (Column 1)**: Vertical column located in the middle-left.
6. **Aisle 2 Column (Column 2)**: Vertical column located in the middle-right.
7. **Rightmost Column (Column 3)**: Spans vertically on the far-right edge.

---

## 2. Complete Stall Classification List

Here is the classification of all **94 stalls** in the exhibition layout:

### A. Triple Stalls (3-Booths Merged)
These stalls are merged into unified **L-shaped corner structures** (totaling 9 stalls across 3 triple units):

1. **`12 · 13 · 14`** (Aisle 2 Top Corner / Column 3 Corner)
   * *Structure*: Stall 14 (top-left) and 13 (top-right) touch horizontally; Stall 12 (bottom-right) touches Stall 13 vertically.
   * *Status*: Merged seamlessly with outer borders only and dashed divider lines.
2. **`41 · 42 · 43`** (Bottom-Left Corner)
   * *Structure*: Stall 43 (top-left) and 42 (bottom-left) touch vertically; Stall 41 (bottom-right) touches Stall 42 horizontally.
   * *Status*: Merged seamlessly with outer borders only and dashed divider lines.
3. **`54 · 55 · 56`** (Top-Left Corner)
   * *Structure*: Stall 55 (top-left corner), Stall 54 (bottom-left, touching 55 vertically), and Stall 56 (top-right, touching 55 horizontally).
   * *Status*: Merged seamlessly with outer borders only and dashed divider lines.

---

### B. Paired Stalls (2-Booths Merged)
These stalls are paired together either horizontally or vertically (totaling 44 stalls across 22 paired units):

#### Horizontal Pairs (Double width: $16'\times8'$)
* **`57 · 58`** (Top Row)
* **`61 · 62`** (Top Row)
* **`35 · 36`** (Bottom Row - Stall 36 is on the left, 35 on the right)
* **`65 · 66`** (Middle Cluster 1 - Stall 66 is on the left, 65 on the right)
* **`63 · 64`** (Middle Cluster 1 - Stall 64 is on the left, 63 on the right)
* **`67 · 68`** (Middle Cluster 1 - Stall 67 is on the left, 68 on the right)
* **`69 · 70`** (Middle Cluster 1 - Stall 69 is on the left, 70 on the right)
* **`71 · 72`** (Middle Cluster 2 - Stall 71 is on the left, 72 on the right)
* **`73 · 74`** (Middle Cluster 2 - Stall 73 is on the left, 74 on the right)
* **`75 · 76`** (Middle Cluster 2 - Stall 75 is on the left, 76 on the right)
* **`77 · 78`** (Middle Cluster 2 - Stall 77 is on the left, 78 on the right)
* **`81 · 82`** (Middle Cluster 3 - Stall 82 is on the left, 81 on the right)
* **`79 · 80`** (Middle Cluster 3 - Stall 80 is on the left, 79 on the right)
* **`83 · 84`** (Middle Cluster 3 - Stall 83 is on the left, 84 on the right)
* **`85 · 86`** (Middle Cluster 3 - Stall 85 is on the left, 86 on the right)
* **`89 · 90`** (Middle Cluster 4 - Stall 90 is on the left, 89 on the right)
* **`87 · 88`** (Middle Cluster 4 - Stall 88 is on the left, 87 on the right)
* **`91 · 92`** (Middle Cluster 4 - Stall 91 is on the left, 92 on the right)
* **`93 · 94`** (Middle Cluster 4 - Stall 93 is on the left, 94 on the right)

#### Vertical Pairs (Double height: $8'\times16'$)
* **`1 · 2`** (Column 3 Bottom-Right Corner)
* **`10 · 11`** (Column 3 Rightmost Column)
* **`44 · 45`** (Column 0 Leftmost Column)
* **`51 · 52`** (Column 0 Leftmost Column - Stall 52 is on top, 51 on bottom)

---

### C. Single Stalls (Individual Booths)
These stalls are individual $8'\times8'$ booths (totaling 41 single stalls):

* **`3, 4, 5, 6, 7, 8, 9`** (Column 3 Rightmost Column)
* **`15, 16, 17, 18, 19, 20, 21, 22, 23, 24`** (Column 2 / Aisle 2 column)
* **`25, 26, 27, 28, 29, 30, 31, 32, 33, 34`** (Column 1 / Aisle 1 column)
* **`37, 38, 39, 40`** (Bottom Row)
* **`46, 47, 48, 49, 50`** (Column 0 Leftmost Column)
* **`53`** (Column 0 Leftmost Column)
* **`59, 60`** (Top Row)

---

## 3. Position & Coordinate Adjustments

The coordinates of the stalls were adjusted to match the 118' physical scale blueprint and remove conflicts:

### Aisle 1 & Aisle 2 back-to-back shift
* **Aisle 1 column (25-34)** was shifted horizontally to **`left: 495px`**, creating a tiny, consistent **`5px` gap** against Aisle 2 (which sits at `left: 558px`). 
* This aligns both columns and leaves wide, symmetrical main walkways of `130px` and `123px` on their outer left and right sides.

### Leftmost Column (Column 0) zero-gap compression
* To fit all 14 vertical stall blocks plus the Service Door within the strict height of the hall ($876\text{px}$):
  * All vertical gaps between stalls in this column were set to **`0px`**.
  * The stalls are aligned continuously using a standard height of `58px` and touching directly.
  * The **Service Door label** was adjusted vertically to **`top: 252px`** to fit exactly in the open corridor space below Stall 53 (which ends at `252px`) and above Stall 52 (which starts at `310px`).

### Bounding Boxes for L-Shape Triples
* **`12-13-14`**: Centered at `left: 681px` (width `116px`, height `116px`).
* **`41-42-43`**: Centered at `left: 0px` (width `116px`, height `116px`).
* **`54-55-56`**: Centered at `left: 0px` (width `116px`, height `116px`).

---

## 4. How Triple Stalls Are Implemented

The L-shaped triple stalls (e.g., `12-13-14`, `41-42-43`, and `54-55-56`) are built using the following architecture:

1. **Outer Absolute Bounding Box**:
   - A wrapper `div` is placed at the exact coordinates of the combined L-shape (e.g., `left: 681px`, `top: 78px`, `width: 116px`, `height: 116px`).
   - The wrapper is styled with `pointer-events: none` so that clicks on the empty "corridor" zone inside the L-shape's rectangular bounds pass through to elements underneath.
2. **Inner Square Child Blocks**:
   - Inside the wrapper, three separate `58px x 58px` square child `div` elements are positioned absolutely to form the L-shape (e.g., left, top-right, bottom-right).
   - Each child block has `pointer-events: auto` to capture click, hover, and selection events for the stall unit.
3. **Seamless Border Overrides**:
   - Touch boundaries between adjacent stalls (e.g., between Stall 14 and 13 horizontally, and Stall 13 and 12 vertically) have their solid borders removed (e.g., `borderRight: 'none'`, `borderBottom: 'none'`).
   - Standard rounded border corners are flattened on touching edges.
   - Internal dashed separator lines (`border-t border-dashed border-current/30` or `border-l border-dashed`) are drawn on the shared seams to visually separate the stalls while preserving a unified outer border outline.
4. **State and Pricing Sync**:
   - The parent `App.jsx` registers the triple stalls as a single unit using their joint array (e.g., `[14, 13, 12]`).
   - Clicks or holds on any of the three children trigger the parent handler, updating their availability status, booking state, and timer together.
   - Price calculation dynamically scales by multiplying the number of booths in the unit: `const price = nums.length * 80000;`.

---

## 5. Potential Pitfalls & Warnings for Future AI Agents

When modifying this codebase, a new AI agent could make several common layout and configuration mistakes. Here is how to prevent and solve them:

### A. Vite HMR State Caching (Stale Coordinates)
* **The Problem**: When you modify coordinate numbers inside `buildInitialUnits()` in `App.jsx`, Vite's Hot Module Replacement (HMR) preserves the active React state (`useState(buildInitialUnits)`) to avoid losing user session data. As a result, the code compiles successfully, but the browser continues to display stalls at their old positions.
* **The Solution**: Always trigger a **hard reload of the browser page (Cmd+R or F5)** to force React to re-evaluate the initial state and load the updated coordinates.

### B. Pointer-Event Blocking in L-Shapes
* **The Problem**: An L-shape occupies a bounding square but leaves a corner empty (the passage/corridor). If the parent wrapper `div` has standard click/hover behaviors, clicking the empty corridor zone will select the stall, blocking clicks to elements beneath it.
* **The Solution**: Keep the parent wrapper styled with `pointer-events: none` and apply `pointer-events: auto` directly on the child stall squares.

### C. Scale Factors in Draggable Organizer (v2 design mode)
* **The Problem**: When the map container uses CSS `transform: scale(S)` to fit the screen size, mouse delta movements ($\Delta x_{screen}$) will cause dragged stalls to move faster or slower than the cursor.
* **The Solution**: Retrieve the bounding rect of the floor plan frame in Javascript: `const rect = frame.getBoundingClientRect(); const scale = rect.width / 797;` and divide any mouse movement coordinates by the scale factor `S` before updating state.

### D. Zero-Gap Grid Alignment Conflicts
* **The Problem**: Adding multiple vertical stalls (e.g., shifting to 14 stalls in the leftmost column) while keeping standard `5px` gaps will exceed the fixed height of the hall outline ($876\text{px}$), causing the bottom corners to overflow.
* **The Solution**: Set the vertical gaps to exactly `0px` in columns with high stall density, letting them touch directly so they fit perfectly within the physical blueprint bounds.
