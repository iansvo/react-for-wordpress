<?php
/**
 * React for WordPress Plugin
 *
 * @package ReactForWordPress
 * @since 1.0.0
 */

/**
 * Get the asset.php manifest file for a given slug in the build directory.
 *
 * @param string $slug The slug of the asset to get the info for.
 * @return array The asset info.
 */
function get_asset_info( $slug ) {
	$file = plugin_dir_url( __FILE__ ) . "build/$slug.asset.php";

	if ( file_exists( $file ) ) {
		$asset = require $file;

		return $asset;
	}

	return [];
}



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

/**
 * Enqueue all blocks in the plugin automatically. This will ensure the block's index.js is properly registered.
 *
 * @return void
 */
function react_for_wordpress_register_blocks() {
	$blocks_dir = plugin_dir_path( __FILE__ ) . 'build/blocks/';

	if ( is_dir( $blocks_dir ) ) {
		$block_json_files = glob( $blocks_dir . '*/block.json' );

		foreach ( $block_json_files as $filename ) {
			register_block_type( $filename );
		}
	}

	register_post_meta(
		'page',
		'bazinga',
		[
			'type'         => 'string',
			'default'      => 'is the thing to say',
			'show_in_rest' => true,
			'single'       => true,
		]
	);
}
add_action( 'init', 'react_for_wordpress_register_blocks' );
