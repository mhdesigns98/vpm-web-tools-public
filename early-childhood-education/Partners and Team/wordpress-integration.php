<?php
/**
 * WordPress Integration for VPM Early Childhood Community Partners Component
 * ==========================================================================
 * 
 * This file contains WordPress functions to properly enqueue the Web Component.
 * 
 * INSTRUCTIONS:
 * ------------
 * Option 1: Add to your theme's functions.php
 *   - Copy the code below into your active theme's functions.php file
 *   - Upload vpm-ecp-partners.js to your theme directory (or a subdirectory)
 *   - Update the $js_path variable to match your file location
 * 
 * Option 2: Create a simple plugin
 *   - Create a new folder: wp-content/plugins/vpm-ecp-partners/
 *   - Copy vpm-ecp-partners.js into that folder
 *   - Create a file named vpm-ecp-partners.php with this code
 *   - Activate the plugin in WordPress admin
 * 
 * USAGE:
 * ------
 * Once the script is enqueued, use the component anywhere in WordPress:
 *   - In Gutenberg blocks: Add an HTML block and use <vpm-ecp-partners></vpm-ecp-partners>
 *   - In page builders: Add an HTML/Custom Code widget with the tag
 *   - In theme templates: Add the tag directly in PHP templates
 */

/**
 * Enqueue the VPM ECP Partners Web Component
 */
function vpm_ecp_partners_enqueue_script() {
    // Update this path to match where you've uploaded the JS file
    // Option 1: In theme directory
    $js_path = get_template_directory_uri() . '/js/vpm-ecp-partners.js';
    
    // Option 2: In plugin directory (if using plugin approach)
    // $js_path = plugin_dir_url(__FILE__) . 'vpm-ecp-partners.js';
    
    // Option 3: From external CDN (if hosted on GitHub Pages, AWS, etc.)
    // $js_path = 'https://your-username.github.io/repo-name/vpm-ecp-partners.js';
    
    wp_enqueue_script(
        'vpm-ecp-partners',           // Handle
        $js_path,                      // Source URL
        array(),                       // Dependencies (none needed)
        '1.0.0',                       // Version number (update when you change the file)
        true                           // Load in footer (recommended for Web Components)
    );
}
add_action('wp_enqueue_scripts', 'vpm_ecp_partners_enqueue_script');

/**
 * Optional: Add shortcode support for easier use in WordPress
 * Usage: [vpm_ecp_partners]
 */
function vpm_ecp_partners_shortcode($atts) {
    return '<vpm-ecp-partners></vpm-ecp-partners>';
}
add_shortcode('vpm_ecp_partners', 'vpm_ecp_partners_shortcode');

/**
 * Optional: Allow the custom element tag in WordPress editor
 * This prevents WordPress from stripping the tag when saving
 */
function vpm_ecp_partners_allow_custom_tags($allowedposttags) {
    $allowedposttags['vpm-ecp-partners'] = array();
    return $allowedposttags;
}
add_filter('wp_kses_allowed_html', 'vpm_ecp_partners_allow_custom_tags', 10, 1);





