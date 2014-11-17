<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package Papyrus2
 */
?>

<header class="entry-header p-bg-image-block u-center">
  <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
</header><!-- .entry-header -->
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<div class="entry-content p-content-area">
		<?php the_content(); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', 'papyrus2' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php edit_post_link( __( 'Edit', 'papyrus2' ), '<p class="edit-link">', '</p>' ); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->
