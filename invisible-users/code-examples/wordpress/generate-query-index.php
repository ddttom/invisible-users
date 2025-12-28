<?php
/**
 * Generate query-index.json for WordPress
 * FIXED VERSION: Uses posts_per_page instead of deprecated numberposts
 *
 * Add this code to your theme's functions.php file
 */

function generate_query_index() {
  // Fetch all published posts
  $posts = get_posts([
    'posts_per_page' => -1, // FIXED: was 'numberposts'
    'post_status' => 'publish', // Only published posts
    'orderby' => 'date',
    'order' => 'DESC'
  ]);

  $data = [];

  foreach ($posts as $post) {
    // Get post categories
    $categories = get_the_category($post->ID);
    $category_name = !empty($categories) ? $categories[0]->name : '';

    // Get post tags
    $tags = get_the_tags($post->ID);
    $tag_names = [];
    if ($tags && !is_wp_error($tags)) {
      foreach ($tags as $tag) {
        $tag_names[] = $tag->name;
      }
    }

    // Build entry
    $data[] = [
      'path' => parse_url(get_permalink($post->ID), PHP_URL_PATH),
      'title' => $post->post_title,
      'description' => $post->post_excerpt ?: wp_trim_words($post->post_content, 30, '...'),
      'category' => $category_name,
      'tags' => $tag_names,
      'author' => get_the_author_meta('display_name', $post->post_author),
      'lastModified' => strtotime($post->post_modified),
      'image' => get_the_post_thumbnail_url($post->ID, 'medium') ?: ''
    ];
  }

  // Build output structure
  $output = [
    'total' => count($data),
    'offset' => 0,
    'limit' => count($data),
    'data' => $data
  ];

  // Write to root directory
  $file_path = ABSPATH . 'query-index.json';
  file_put_contents($file_path, json_encode($output, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

  return count($data);
}

// Hook to post save - regenerate index when content changes
add_action('save_post', 'generate_query_index');

// Also regenerate when posts are deleted
add_action('delete_post', 'generate_query_index');

// Optional: Add admin notice to confirm generation
add_action('admin_notices', function() {
  if (isset($_GET['post']) && isset($_GET['action']) && $_GET['action'] === 'edit') {
    $count = generate_query_index();
    echo '<div class="notice notice-success is-dismissible">';
    echo '<p>AI query index regenerated with ' . $count . ' entries.</p>';
    echo '</div>';
  }
});
