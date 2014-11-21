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
  <nav class="p-nav p-nav--light">
    <ul class="p-nav-horiz p-nav-horiz--bordered u-center-vert">
      <li class="p-site-logo">
        <a href="http://papyrusoft.com"><img src="http://papyrusoft.com/wp-content/themes/papyrus2/assets/papyrus-logo-icon.svg"></a>
        <a href="http://papyrusoft.com">Papyrusoft</a>
      </li>
      <li>
        <ul class="p-nav-vert">
          <li><a href="/portfolio">Portfolio</a></li>
          <li><a href="/guiding-principles">GPS</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </li>
  </nav>
	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

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

    var previousScrollTop;

    $(function () {
      $slidersTop = $(".js-scroll-slider-top");

      if($(window).scrollTop() < $slidersTop.height()) {
        $slidersTop.removeClass("p-slider--up");
      }

      $slidersTop.mouseleave(papyrus.debounce(function () {
        $(this).addClass("p-slider--up");
      }, 1000));
    });

    $(window).scroll(function () {
      $slidersTop = $(".js-scroll-slider-top");
      scrollTop = $(window).scrollTop();
      if(
          (previousScrollTop > scrollTop || scrollTop < $slidersTop.height()) &&
          scrollTop < $(document).height() - $(window).height() - $slidersTop.height()
      ) {
        $slidersTop.removeClass("p-slider--up");
      } else {
        $slidersTop.addClass("p-slider--up");
      }
      previousScrollTop = $(window).scrollTop();
    });
  </script>
</body>
