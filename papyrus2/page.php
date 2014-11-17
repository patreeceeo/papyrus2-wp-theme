<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package Papyrus2
 */

get_header(); ?>

<body <?php body_class(); ?>>
	<div id="primary" class="content-area u-inline">
		<main id="main" class="site-main u-inline" role="main">

			<?php while ( have_posts() ) : the_post(); ?>

				<?php get_template_part( 'content', 'page' ); ?>

				<?php
					// If comments are open or we have at least one comment, load up the comment template
					if ( comments_open() || get_comments_number() ) :
						comments_template();
					endif;
				?>

			<?php endwhile; // end of the loop. ?>

		</main><!-- #main -->
	</div><!-- #primary -->
  <?php get_sidebar(); ?>
  <?php get_footer(); ?>
  <script type="text/javascript">
    $(function () {
      $("header h1").fitText({
        maxSize: "initial"
      });
    });
    $(window).resize(function () {
      $("header h1").fitText({
        maxSize: "initial"
      });
    });
  </script>
</body>
