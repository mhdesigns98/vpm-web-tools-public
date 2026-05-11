# VPM Spotlight Homepage Component

A content management system for displaying three call-to-action cards on the homepage with a tag-based queue management system.

## Features

- **Tag-based System**: Items tagged with "high priority" are displayed (up to 3 at a time)
- **Automatic Queue Management**: Adding a 4th "high priority" item automatically removes the tag from the oldest item
- **Hide (Not Delete)**: Items without the tag are preserved in JSON for reuse
- **Smooth Animations**: Cards slide in/out when tags change
- **Responsive Design**: Works on all screen sizes
- **Admin Interface**: Easy-to-use web interface for managing content

## Files

- `spotlight-inline.html` - **Single-file inline version** (for CMS that only accepts inline HTML/CSS/JS)
- `index.html` - Homepage component (separate files version)
- `styles.css` - Component styling
- `script.js` - Queue management logic
- `content-queue.json` - Content data storage (host on GitHub)
- `admin.html` - Admin interface for managing content

## Usage

### For CMS with Inline HTML/CSS/JS Support

**Recommended for most CMS systems:**

1. Open `spotlight-inline.html` in a text editor
2. Find the `GITHUB_JSON_URL` constant near the top of the `<script>` section
3. Update it with your GitHub raw URL:
   ```javascript
   const GITHUB_JSON_URL = 'https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/VPM-Spotlight-Homepage/content-queue.json';
   ```
4. Copy the **entire contents** of `spotlight-inline.html`
5. Paste it into your CMS where you can add HTML/CSS/JS inline
6. The component will automatically load content from your GitHub repository

### For Sites with Separate File Support

1. Include the component files on your homepage:
   ```html
   <link rel="stylesheet" href="path/to/styles.css">
   <div id="spotlight-section"></div>
   <script src="path/to/script.js"></script>
   ```

2. Or use the standalone `index.html` as a reference implementation.

### Managing Content

1. Open `admin.html` in your browser (or edit `content-queue.json` directly)
2. Click "Add New Item" to create content
3. Fill in the required fields:
   - **Picture URL**: Image URL for the card
   - **Title**: Main title (required)
   - **Subtitle**: Smaller text under title (e.g., show name)
   - **Description**: Card description (required)
   - **Link URL**: Where the card should link to
   - **High Priority**: Checkbox to activate the item
4. Click "Save Item"
5. Use "Add to Spotlight" / "Remove from Spotlight" buttons to toggle items
6. Click "Export JSON" to download the updated `content-queue.json`
7. **Commit and push** the updated `content-queue.json` to your GitHub repository
8. The component will automatically fetch the updated content (may take a few minutes due to GitHub caching)

### Content Structure

Each item in `content-queue.json` has:
- `id`: Unique identifier
- `picture`: Image URL
- `title`: Main title
- `subtitle`: Subtitle (smaller text)
- `description`: Description text
- `link`: Link URL
- `tags`: Array of tags (use `["high priority"]` to activate)
- `dateAdded`: ISO timestamp

### How It Works

- Only items with the `"high priority"` tag are displayed
- Maximum of 3 items can be active at once
- When a 4th item is tagged "high priority", the oldest active item automatically loses its tag
- Items without the tag remain in the JSON file but are hidden
- Cards animate smoothly when items are added or removed

## Styling

The component uses VPM brand colors and can be customized via CSS variables in `styles.css`:
- `--vpm-dark-blue`: #003865
- `--vpm-light-blue`: #6CACE4
- `--vpm-yellow`: #E0E721
- `--vpm-red`: #EE2737

## Browser Support

Works in all modern browsers that support:
- ES6+ JavaScript
- CSS Grid
- Fetch API
