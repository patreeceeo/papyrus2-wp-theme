<?php
/*
 * Template Name: Landing
 *
 * @package Papyrus2
 */
get_header(); ?>


<main class="p-welcome-sign">
  <div class="p-welcome-sign-inner">
    <div class="u-cf">
      <figure>
        <div data-papyrus-plugin="slider">
          <!-- Don't show Dozmia until launch -->
          <!--a data-papyrus-slider-element="slide" class="p-welcome-sign-slide u-zi-animation" style="background-image:url('http://papyrusoft.com/wp-content/uploads/2014/11/Dozmia-home-medium.gif');" href="/portfolio">
          </a>
          <a data-papyrus-slider-element="slide" class="p-welcome-sign-slide u-zi-animation" style="background-image:url('http://papyrusoft.com/wp-content/uploads/2014/11/Dozmia-playlist-medium.gif');" href="/portfolio">
          </a-->
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
        <h1 class="js-fit-text">Patrick Canfield</h1>
        <h2 class="js-fit-text">Software Engineer - Freelance &amp;&amp; Consulting</h2>
        <p>Let me help create your next kick-a55 project!</p>
        <p class="u-only-desktop">Figure left: examples of past work. Use the arrow keys to control which thumbnail is shown. Click for details!</p>
      </section>
    </div>
    <p class="p-call-to-action">
      <a class="" href="/contact">Contact me</a>
    </p>
  </div>
  <nav class="u-only-mobile u-zi-nav">
    <ul class="p-nav-vert">
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
</main>
