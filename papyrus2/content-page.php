<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package Papyrus2
 */
?>

<?php 
  $image_data = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'single-post-thumbnail' ); 
  $image_url = $image_data[0];
?>

<article id="post-<?php the_ID(); ?>" <?php post_class("u-flex-column"); ?>>
  <header class="entry-header p-bg-image-block u-center u-bg-fixed js-flex-fill-remaining-screen-height" style="background-image: url(<?php echo $image_url ?>);">
    <div class="p-bg-image-block-overlay">
      <?php the_title( '<h1 class="entry-title u-pack-vert u-pack-horiz">', '</h1>' ); ?>
    </div>
  </header><!-- .entry-header -->

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
<script type="text/javascript">
  $(function () {
    $(".js-flex-fill-remaining-screen-height").each(function (index, element) {
      function adjust () {
        var heightRemaining;
        heightRemaining = $(window).height() - $(element).offset().top;
        $(element).css("flex-basis", heightRemaining);
      }
      setTimeout(adjust, 1);
      $(window).resize(adjust);
    });
  });
</script>
