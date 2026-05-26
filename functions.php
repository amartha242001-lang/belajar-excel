<?php
/**
 * CyberNeurova - WordPress Theme Functions
 * Website Tutorial Rumus & Shortcut MS Excel
 */

// ========== THEME SETUP ==========
function cyberneurova_setup() {
    // Dukungan judul otomatis
    add_theme_support( 'title-tag' );

    // Dukungan thumbnail/featured image
    add_theme_support( 'post-thumbnails' );

    // Daftarkan menu navigasi
    register_nav_menus( array(
        'primary' => esc_html__( 'Menu Utama', 'cyberneurova' ),
        'footer'  => esc_html__( 'Menu Footer', 'cyberneurova' ),
    ) );

    // Dukungan HTML5
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ) );
}
add_action( 'after_setup_theme', 'cyberneurova_setup' );

// ========== ENQUEUE STYLES & SCRIPTS ==========
function cyberneurova_scripts() {
    wp_enqueue_style( 'cyberneurova-style', get_stylesheet_uri(), array(), '1.0.0' );
    wp_enqueue_script( 'cyberneurova-script', get_template_directory_uri() . '/script.js', array(), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'cyberneurova_scripts' );

// ========== REGISTER SIDEBAR / WIDGET AREA ==========
function cyberneurova_register_widgets() {
    register_sidebar( array(
        'name'          => esc_html__( 'Sidebar Excel Tips', 'cyberneurova' ),
        'id'            => 'sidebar-excel-tips',
        'description'   => esc_html__( 'Tempatkan widget untuk menampilkan rumus populer atau shortcut cepat.', 'cyberneurova' ),
        'before_widget' => '<section class="widget cyberneurova-widget">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ) );
}
add_action( 'widgets_init', 'cyberneurova_register_widgets' );

// ========== SHORTCODES ==========

/**
 * Shortcode: [excel_vlookup]
 * Menampilkan contoh penggunaan VLOOKUP
 */
function excel_vlookup_shortcode() {
    $output = '<div class="excel-formula-box">';
    $output .= '<h4>📊 Contoh Penggunaan VLOOKUP:</h4>';
    $output .= '<div class="syntax-box"><code>=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])</code></div>';
    $output .= '<p><strong>Parameter:</strong></p>';
    $output .= '<ul>';
    $output .= '<li><code>lookup_value</code> - Nilai yang dicari</li>';
    $output .= '<li><code>table_array</code> - Range tabel pencarian</li>';
    $output .= '<li><code>col_index_num</code> - Nomor kolom hasil</li>';
    $output .= '<li><code>[range_lookup]</code> - TRUE/FALSE (opsional)</li>';
    $output .= '</ul>';
    $output .= '</div>';
    return $output;
}
add_shortcode( 'excel_vlookup', 'excel_vlookup_shortcode' );

/**
 * Shortcode: [excel_if]
 * Menampilkan contoh penggunaan IF
 */
function excel_if_shortcode() {
    $output = '<div class="excel-formula-box">';
    $output .= '<h4>🔀 Contoh Penggunaan IF:</h4>';
    $output .= '<div class="syntax-box"><code>=IF(logical_test, value_if_true, value_if_false)</code></div>';
    $output .= '<p><strong>Contoh:</strong> <code>=IF(B2>=75, "Lulus", "Tidak Lulus")</code></p>';
    $output .= '<p>Jika nilai di B2 ≥ 75, hasilnya "Lulus". Jika tidak, "Tidak Lulus".</p>';
    $output .= '</div>';
    return $output;
}
add_shortcode( 'excel_if', 'excel_if_shortcode' );

/**
 * Shortcode: [excel_hlookup]
 * Menampilkan contoh penggunaan HLOOKUP
 */
function excel_hlookup_shortcode() {
    $output = '<div class="excel-formula-box">';
    $output .= '<h4>↔️ Contoh Penggunaan HLOOKUP:</h4>';
    $output .= '<div class="syntax-box"><code>=HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])</code></div>';
    $output .= '<p><strong>Contoh:</strong> <code>=HLOOKUP("Januari", A1:L3, 3, FALSE)</code></p>';
    $output .= '<p>Mencari "Januari" di baris pertama, mengembalikan nilai dari baris ke-3.</p>';
    $output .= '</div>';
    return $output;
}
add_shortcode( 'excel_hlookup', 'excel_hlookup_shortcode' );

/**
 * Shortcode: [excel_shortcut keys="Ctrl+C" desc="Copy sel"]
 * Menampilkan shortcut keyboard dengan styling
 */
function excel_shortcut_shortcode( $atts ) {
    $atts = shortcode_atts( array(
        'keys' => 'Ctrl+C',
        'desc' => 'Shortcut Excel',
    ), $atts );

    $keys = explode( '+', $atts['keys'] );
    $kbd_html = '';
    foreach ( $keys as $key ) {
        $kbd_html .= '<kbd>' . esc_html( trim( $key ) ) . '</kbd>';
    }

    $output = '<div class="shortcut-item">';
    $output .= '<div class="shortcut-keys">' . $kbd_html . '</div>';
    $output .= '<div class="shortcut-desc">' . esc_html( $atts['desc'] ) . '</div>';
    $output .= '</div>';
    return $output;
}
add_shortcode( 'excel_shortcut', 'excel_shortcut_shortcode' );

/**
 * Shortcode: [excel_tip]Isi tips[/excel_tip]
 * Menampilkan kotak tips
 */
function excel_tip_shortcode( $atts, $content = null ) {
    $output = '<div class="tips-box">';
    $output .= '<h4>💡 Tips:</h4>';
    $output .= '<p>' . wp_kses_post( $content ) . '</p>';
    $output .= '</div>';
    return $output;
}
add_shortcode( 'excel_tip', 'excel_tip_shortcode' );

// ========== CUSTOM POST TYPE: RUMUS EXCEL ==========
function cyberneurova_register_cpt() {
    // Custom Post Type: Rumus Excel
    register_post_type( 'rumus_excel', array(
        'labels' => array(
            'name'               => 'Rumus Excel',
            'singular_name'      => 'Rumus Excel',
            'add_new'            => 'Tambah Rumus Baru',
            'add_new_item'       => 'Tambah Rumus Excel Baru',
            'edit_item'          => 'Edit Rumus Excel',
            'view_item'          => 'Lihat Rumus Excel',
            'all_items'          => 'Semua Rumus',
            'search_items'       => 'Cari Rumus',
        ),
        'public'       => true,
        'has_archive'  => true,
        'rewrite'      => array( 'slug' => 'rumus' ),
        'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
        'menu_icon'    => 'dashicons-media-spreadsheet',
        'show_in_rest' => true,
    ) );

    // Custom Post Type: Shortcut Excel
    register_post_type( 'shortcut_excel', array(
        'labels' => array(
            'name'               => 'Shortcut Excel',
            'singular_name'      => 'Shortcut Excel',
            'add_new'            => 'Tambah Shortcut Baru',
            'add_new_item'       => 'Tambah Shortcut Excel Baru',
            'edit_item'          => 'Edit Shortcut Excel',
            'view_item'          => 'Lihat Shortcut Excel',
            'all_items'          => 'Semua Shortcut',
            'search_items'       => 'Cari Shortcut',
        ),
        'public'       => true,
        'has_archive'  => true,
        'rewrite'      => array( 'slug' => 'shortcut' ),
        'supports'     => array( 'title', 'editor', 'thumbnail' ),
        'menu_icon'    => 'dashicons-editor-code',
        'show_in_rest' => true,
    ) );
}
add_action( 'init', 'cyberneurova_register_cpt' );

// ========== CUSTOM TAXONOMY: KATEGORI RUMUS ==========
function cyberneurova_register_taxonomy() {
    register_taxonomy( 'kategori_rumus', 'rumus_excel', array(
        'labels' => array(
            'name'          => 'Kategori Rumus',
            'singular_name' => 'Kategori',
            'add_new_item'  => 'Tambah Kategori Baru',
        ),
        'hierarchical' => true,
        'rewrite'      => array( 'slug' => 'kategori-rumus' ),
        'show_in_rest' => true,
    ) );

    register_taxonomy( 'kategori_shortcut', 'shortcut_excel', array(
        'labels' => array(
            'name'          => 'Kategori Shortcut',
            'singular_name' => 'Kategori',
            'add_new_item'  => 'Tambah Kategori Baru',
        ),
        'hierarchical' => true,
        'rewrite'      => array( 'slug' => 'kategori-shortcut' ),
        'show_in_rest' => true,
    ) );
}
add_action( 'init', 'cyberneurova_register_taxonomy' );
?>
