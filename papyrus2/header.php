<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package Papyrus2
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?php wp_title( '|', true, 'right' ); ?></title>
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
  <nav class="p-layout-top-nav u-zi-nav">
    <ul class="p-nav-horiz u-cf">
      <li class="u-pull-right">
        <a href="/blog">Blog</a>
      </li>
      <li class="u-pull-left">
        <a href="/portfolio">Portfolio</a>
      </li>
      <li class="u-pull-left">
        <a href="/gps">GPS</a>
      </li>
    </ul> 
  </nav>
