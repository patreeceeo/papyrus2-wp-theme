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
<link rel="icon" href="<?php echo get_template_directory_uri() . "/favicon.gif"; ?>">

<link href='http://fonts.googleapis.com/css?family=Lato:300,300italic' rel='stylesheet' type='text/css'>

<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
  <nav class="p-layout-top-nav u-zi-nav u-only-desktop">
    <ul class="p-nav-horiz u-cf">
      <li class="u-pull-right">
        <a class="p-keyboard-key p-keyboard-key--mirror" href="/blog">Blog</a>
      </li>
      <li class="u-pull-left">
        <a class="p-keyboard-key" href="/portfolio">Portfolio</a>
      </li>
      <li class="u-pull-left">
        <a class="p-keyboard-key" href="/gps">GPS</a>
      </li>
    </ul> 
  </nav>
