<?php
/*
Plugin Name: Chat Widget
Description: React FAQ Widget for WordPress
Version: 1.0
Author: hank
*/

// 載入設定頁面程式碼
if (!defined('ABSPATH')) exit; // 防止直接訪問

// 載入 REST API
require_once plugin_dir_path(__FILE__) . 'includes/api/index.php';
// 載入後台設定頁
require_once plugin_dir_path(__FILE__) . 'admin/menu.php';


function enqueue_chat_widget() {
    if(!is_admin()){
    // 載入你打包好的 React JS
    $asset_path = plugin_dir_path(__FILE__) . 'build/widget.js';
    $asset_url  = plugin_dir_url(__FILE__) . 'build/widget.js';
    
    wp_enqueue_script(
        'chat-widget',
        $asset_url,
        array(),
        filemtime($asset_path), // 用檔案時間當作版本號
        true
    );
    
        // 2. 注入 siteUrl、restUrl、nonce 給前端
        if (wp_script_is('chat-widget', 'enqueued')) {
            wp_localize_script('chat-widget', 'WP_DATA', array(
                'siteUrl' => get_site_url(),
                'restUrl' => esc_url_raw(rest_url()),
                'nonce'   => wp_create_nonce('wp_rest'),
            ));
        }
    }
}

// 在前台頁面載入腳本
add_action('wp_enqueue_scripts', 'enqueue_chat_widget');

// 在 footer 輸出掛載點 div，React 會用這個地方掛載
add_action('wp_footer', function() {
    echo '<div id="faq-chat-root"></div>';
});

