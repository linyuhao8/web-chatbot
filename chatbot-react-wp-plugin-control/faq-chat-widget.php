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


function enqueue_faq_chat_widget() {
    if(!is_admin()){
    // 載入你打包好的 React JS
    wp_enqueue_script(
        'faq-chat-widget',
        plugin_dir_url(__FILE__) . 'build/widget.js',
        array(), // 如果你的打包已包含 React、ReactDOM 就不用依賴這裡填
        '1.0',
        true // 放 footer 載入比較安全，確保 DOM 已經建立
    );
    }
}

// 在前台頁面載入腳本
add_action('wp_enqueue_scripts', 'enqueue_faq_chat_widget');

// 在 footer 輸出掛載點 div，React 會用這個地方掛載
add_action('wp_footer', function() {
    echo '<div id="faq-chat-root"></div>';
});

