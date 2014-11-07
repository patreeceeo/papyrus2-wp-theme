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
          <div data-papyrus-slider-element="slide" class="p-welcome-sign-slide">
            <h1>Hello!</h1>
          </div>
          <div data-papyrus-slider-element="slide" class="p-welcome-sign-slide">
            <h1>Okay!</h1>
          </div>
          <div data-papyrus-slider-element="slide" class="p-welcome-sign-slide">
            <h1>Bye!</h1>
          </div>
        </div>
      </figure><section>
        <h1>Patrick Canfield</h1>
        <h3>Software Engineer &amp;&amp; Graphic Designer for Freelance</h3>
        <p>Need an expert for your next project? I delight in delivering <a href="/blog/tag/balanced">balanced</a> solutions, exceeding expectations and sharing my knowledge.</p>
      </section>
    </div>
  </div>
</main>
