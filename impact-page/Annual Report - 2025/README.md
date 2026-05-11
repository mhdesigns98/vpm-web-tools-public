# VPM 2025 Impact Report - Embeddable Component

This directory contains the VPM 2025 Impact Report component, split into separate files for easy integration into Brightspot CMS.

## File Structure

- **`index.html`** - Standalone preview version (for testing)
- **`impact-report.html`** - HTML structure only (for Brightspot HTML blocks)
- **`impact-report.css`** - All styles scoped to `.vpm-impact-component`
- **`impact-report.js`** - Component JavaScript functionality
- **`embed.html`** - Combined version with inline CSS/JS for single-block embedding

## Brightspot Integration Options

### Option 1: Separate Blocks (Recommended)

This approach separates CSS, HTML, and JavaScript for better performance and maintainability.

1. **Add CSS to Brightspot:**
   - Copy contents of `impact-report.css`
   - Add to Brightspot's CSS/head section or global stylesheet
   - Or upload as an asset and link in template head

2. **Add HTML to Content Block:**
   - Copy contents of `impact-report.html`
   - Paste into an HTML content block in Brightspot

3. **Add JavaScript:**
   - Copy contents of `impact-report.js`
   - Add to Brightspot's footer/script section
   - Or upload as an asset and include before closing `</body>` tag

### Option 2: Single HTML Block (Simplest)

Use the `embed.html` file for a single-block solution.

1. **Copy the entire contents of `embed.html`**
2. **Paste into a Brightspot HTML content block**
3. **Done!** All styles and scripts are inline

**Note:** This creates a larger HTML block but is self-contained and portable.

### Option 3: External Files (Best Performance)

Host the CSS and JS files on your CDN/assets server.

1. **Upload files:**
   - Upload `impact-report.css` to your assets/CDN
   - Upload `impact-report.js` to your assets/CDN

2. **Reference in Brightspot template:**
   ```html
   <link rel="stylesheet" href="https://your-cdn.com/path/to/impact-report.css">
   ```

3. **Include HTML:**
   - Copy contents of `impact-report.html`
   - Paste into HTML content block

4. **Include JavaScript:**
   ```html
   <script src="https://your-cdn.com/path/to/impact-report.js"></script>
   ```

## Component Features

- **Fully Scoped:** All styles are scoped to `.vpm-impact-component` to prevent conflicts
- **Responsive:** Mobile-first design with breakpoints at 768px
- **Accessible:** ARIA labels, semantic HTML, keyboard navigation support
- **Performance:** Lazy loading images, optimized animations
- **Browser Support:** Includes smooth scroll fallback for older browsers

## Styling Notes

- All CSS selectors are prefixed with `.vpm-impact-component` for isolation
- CSS custom properties (variables) are defined at the component root
- Font import can be moved to Brightspot head or replaced with your font service
- Component uses VPM brand colors defined as CSS variables

## JavaScript Features

- Smooth scroll navigation
- Active section highlighting via Intersection Observer
- Expandable letter details
- Multiple component instance support
- Error handling for missing elements

## Testing

1. Open `index.html` in a browser for local testing
2. Verify all sections render correctly
3. Test navigation links
4. Test letter expand/collapse functionality
5. Test responsive breakpoints

## Customization

### Changing Colors

Edit CSS variables in `impact-report.css`:

```css
.vpm-impact-component {
  --vpm-navy: #003865;
  --vpm-gold: #e0e721;
  /* etc. */
}
```

### Changing Fonts

Replace the Google Fonts import or update the font-family:

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
```

### Adjusting Max Width

Modify the `--max-width` variable:

```css
.vpm-impact-component {
  --max-width: 1100px; /* Change as needed */
}
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with smooth scroll fallback)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- Component is self-contained and doesn't require external dependencies (except Google Fonts)
- All images use lazy loading for performance
- JavaScript initializes automatically when DOM is ready
- Multiple instances of the component can exist on the same page

## Support

For questions or issues, contact the VPM development team.
