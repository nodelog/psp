<?php
/**
 * Template Name: Page without Title
 * The template file for pages without the page title.
 * @package MineZine
 * @since MineZine 1.0.0
*/
get_header(); ?>
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
<?php if ($minezine_options_db['minezine_display_breadcrumb'] != 'Hide') { ?>
    <div class="content-headline">
<?php minezine_get_breadcrumb(); ?>
    </div>
<?php } ?>
<?php minezine_get_display_image_page(); ?>
    <div class="entry-content">
<?php the_content(); ?>
<?php edit_post_link( __( 'Edit', 'minezine' ), '<p>', '</p>' ); ?>
<?php endwhile; endif; ?>
<?php comments_template( '', true ); ?>
    </div>   
  </div> <!-- end of content -->
<?php get_sidebar(); ?>
<?php get_footer(); ?>