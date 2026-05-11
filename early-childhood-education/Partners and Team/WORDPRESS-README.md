# WordPress Integration Guide - VPM Early Childhood Community Partners Component

## Overview

This Web Component provides a fully isolated, cross-site compatible solution for displaying the VPM Early Childhood Community Partners page. It uses Shadow DOM to prevent any CSS or JavaScript conflicts with your WordPress theme.

## Quick Start

### Step 1: Upload the JavaScript File

Upload `vpm-ecp-partners.js` to one of these locations:

- **Option A (Recommended)**: Your theme's `/js/` directory
  - Path: `wp-content/themes/your-theme/js/vpm-ecp-partners.js`
  
- **Option B**: A plugin directory
  - Path: `wp-content/plugins/vpm-ecp-partners/vpm-ecp-partners.js`
  
- **Option C**: External hosting (GitHub Pages, AWS S3, CDN)
  - Host the file externally and reference the full URL

### Step 2: Enqueue the Script

Add the WordPress integration code to your theme's `functions.php` file:

```php
<?php
function vpm_ecp_partners_enqueue_script() {
    // Update this path to match your file location
    $js_path = get_template_directory_uri() . '/js/vpm-ecp-partners.js';
    
    wp_enqueue_script(
        'vpm-ecp-partners',
        $js_path,
        array(),
        '1.0.0',
        true  // Load in footer
    );
}
add_action('wp_enqueue_scripts', 'vpm_ecp_partners_enqueue_script');
```

**Or** copy the complete code from `wordpress-integration.php` which includes additional helpful functions.

### Step 3: Use the Component

Once the script is loaded, use the component anywhere in WordPress:

#### In Gutenberg Editor:
1. Add an **HTML** block
2. Enter: `<vpm-ecp-partners></vpm-ecp-partners>`
3. Publish

#### In Page Builders (Elementor, Beaver Builder, etc.):
1. Add an **HTML** or **Custom Code** widget
2. Enter: `<vpm-ecp-partners></vpm-ecp-partners>`
3. Save

#### In Theme Templates:
```php
<?php
// In any PHP template file
echo '<vpm-ecp-partners></vpm-ecp-partners>';
?>
```

#### Using Shortcode (if enabled):
If you've added the shortcode function from `wordpress-integration.php`:
```
[vpm_ecp_partners]
```

## File Structure

```
your-wordpress-site/
├── wp-content/
│   ├── themes/
│   │   └── your-theme/
│   │       ├── functions.php          ← Add enqueue code here
│   │       └── js/
│   │           └── vpm-ecp-partners.js  ← Upload file here
│   └── plugins/
│       └── vpm-ecp-partners/          ← OR create plugin folder
│           ├── vpm-ecp-partners.php   ← Plugin file with enqueue code
│           └── vpm-ecp-partners.js    ← Component file
```

## Advanced: External Hosting (Recommended for Multiple Sites)

If you want to use this component on multiple WordPress sites, host it externally:

### GitHub Pages Example:
1. Upload `vpm-ecp-partners.js` to a GitHub repository
2. Enable GitHub Pages
3. Update the enqueue path:

```php
$js_path = 'https://your-username.github.io/repo-name/vpm-ecp-partners.js';
```

### Benefits of External Hosting:
- ✅ Update once, all sites get the update
- ✅ CDN caching for faster loading
- ✅ Version control via URL parameters
- ✅ Works across multiple WordPress installations

## Troubleshooting

### Component Not Showing
1. **Check browser console** for JavaScript errors
2. **Verify script is loading**: View page source and search for `vpm-ecp-partners.js`
3. **Check file path**: Ensure the path in `functions.php` matches your file location
4. **Clear cache**: Clear WordPress cache and browser cache

### Styles Not Working
- The component uses Shadow DOM, so styles are completely isolated
- If you see unstyled content, the JavaScript may not be loading
- Check that the script is enqueued and the file path is correct

### WordPress Stripping the Tag
- Add the filter from `wordpress-integration.php` to allow the custom tag
- Or use the shortcode approach instead

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Note**: Web Components are supported in all modern browsers. For older browsers (IE11), you would need polyfills, but these are rarely needed for WordPress sites in 2025.

## Version History

- **v1.0.0** - Initial Web Component release with Shadow DOM isolation

## Support

For issues or questions, check:
1. Browser console for errors
2. WordPress debug log (if WP_DEBUG is enabled)
3. Verify the script file is accessible at the URL specified in `functions.php`





