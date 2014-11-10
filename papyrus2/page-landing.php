<?php
/*
 * Template Name: Landing
 *
 * @package Papyrus2
 */
get_header(); ?>


<main class="p-layout-full-screen p-bg-solid-dark u-zi-bg">
  <div class="p-welcome-sign">
    <div class="p-welcome-sign-inner">
      <figure>
        <img src="<?php echo get_template_directory_uri() . "/assets/papyrus-logo.svg"; ?>">
        <div data-papyrus-plugin="slider">
          <a data-papyrus-slider-element="slide" class="p-welcome-sign-slide u-zi-animation" style="background-image:url('http://papyrusoft.com/wp-content/uploads/2014/11/Dozmia-home-medium.gif');" href="/portfolio">
          </a>
          <a data-papyrus-slider-element="slide" class="p-welcome-sign-slide u-zi-animation" style="background-image:url('http://papyrusoft.com/wp-content/uploads/2014/11/Dozmia-playlist-medium.gif');" href="/portfolio">
          </a>
          <a data-papyrus-slider-element="slide" class="p-welcome-sign-slide u-zi-animation" style="background-image:url('<?php echo get_template_directory_uri() . "/assets/honeycomb.svg"; ?>');" href="/portfolio">
          </a>
          <a data-papyrus-slider-element="slide" class="p-welcome-sign-slide u-zi-animation" style="background-image:url('http://papyrusoft.com/wp-content/uploads/2014/11/EventRay-home-medium.jpg');" href="/portfolio">
          </a>
          <a data-papyrus-slider-element="slide" class="p-welcome-sign-slide u-zi-animation" style="background-image:url('http://papyrusoft.com/wp-content/uploads/2014/11/Synack-id-verify-1-medium.gif');" href="/portfolio">
          </a>
          <a data-papyrus-slider-element="slide" class="p-welcome-sign-slide u-zi-animation" style="background-image:url('http://papyrusoft.com/wp-content/uploads/2014/11/Synack-id-verify-2-medium.gif');" href="/portfolio">
          </a>
          <a data-papyrus-slider-element="slide" class="p-welcome-sign-slide u-zi-animation" style="background-image:url('http://papyrusoft.com/wp-content/uploads/2014/11/Sophie-1-medium.gif');" href="/portfolio">
          </a>
        </div>
      </figure><section>
        <h1>Patrick Canfield</h1>
        <h3>Software Engineer &amp;&amp; Graphic Designer for Freelance</h3>
        <p>Need an expert for your next project? I delight in delivering <a href="/blog/tag/balanced">balanced</a> solutions, exceeding expectations and sharing my knowledge.</p>
      </section>
      <nav class="u-only-mobile u-zi-nav">
        <ul class="p-menu ">
          <li>
            <a class="p-bg-solid-dark" href="/blog">Blog</a>
          </li>
          <li>
            <a class="p-bg-solid-dark" href="/portfolio">Portfolio</a>
          </li>
          <li>
            <a class="p-bg-solid-dark" href="/gps">GPS</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</main>
