<?php
/**
 * React for WordPress Plugin
 *
 * @package ReactForWordPress
 * @since 1.0.0
 */

/**
 * Plugin Name: React for WordPress
 * Description: A workshop course to learn scrappy React skills for WordPress development.
 * Author: Ian Svoboda
 * Author URI: https://svoboda.dev
 * Version: 1.0.0
 * Text Domain: react-for-wordpress
 * PHP Version: 8.0+
 */
function react_for_wordpress_enqueue_editor_scripts() {
	wp_enqueue_script( 'react-for-wordpress', plugin_dir_url( __FILE__ ) . 'build/index.js', array(), '1.0.0', true );
}

add_action( 'enqueue_block_editor_assets', 'react_for_wordpress_enqueue_editor_scripts' );

/**
 * Add block editor styles.
 *
 * @return void
 */
function react_for_wordpress_enqueue_frontend_assets() {
	wp_enqueue_style( 'react-for-wordpress', plugin_dir_url( __FILE__ ) . 'build/index.css', array(), '1.0.0' );
}

add_action( 'enqueue_block_assets', 'react_for_wordpress_enqueue_frontend_assets' );
