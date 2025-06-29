<?php
if (!defined('ABSPATH')) {
    exit;
}

// 載入設定頁面檔案
require_once plugin_dir_path(__FILE__) . 'config-page.php';

function chatbot_add_admin_menu() {
    add_menu_page(
        'FAQ 小工具',
        'FAQ Widget',
        'manage_options',
        'chatbot-config-page',
        'chatbot_config_page_callback',
        'dashicons-format-chat',
        50
    );
}

add_action('admin_menu', 'chatbot_add_admin_menu', 20);