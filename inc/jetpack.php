<?php
/**
 * Jetpack Compatibility File
 * See: http://jetpack.me/
 *
 * @package Papyrus2
 */

/**
 * Add theme support for Infinite Scroll.
 * See: http://jetpack.me/support/infinite-scroll/
 */
function papyrus2_jetpack_setup() {
	add_theme_support( 'infinite-scroll', array(
		'container' => 'main',
		'footer'    => 'page',
	) );
}
add_action( 'after_setup_theme', 'papyrus2_jetpack_setup' );
