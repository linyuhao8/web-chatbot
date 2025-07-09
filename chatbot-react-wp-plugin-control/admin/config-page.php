<?php
if (!defined('ABSPATH')) {
    exit; // 防止直接透過網址直接訪問此檔案
}

/**
 * 2. 註冊設定欄位、群組與驗證回調
 */
add_action('admin_init', 'chatbot_register_settings', 10);
// 註冊設定欄位和群組
if (!function_exists('chatbot_register_settings')) {
    function chatbot_register_settings() {
        register_setting('chatbot_options_group', 'chatbot_flows_json' , 'chatbot_validation_json');
  
        add_settings_section(
            'chatbot_settings_section', // section ID
            '聊天機器人設定',           // 標題
            function () {
                echo '<p><strong>請設定聊天流程的 JSON 結構。</strong></p>';
                echo '<p>若機器人出現故障，請先檢查 <a href="/wp-json/chatbot/v1/settings" target="_blank">JSON 輸出網址</a> 是否正常。</p>';
                echo '<p>若顯示為空白，代表 JSON 結構錯誤，可使用 <a href="https://jsoncrack.com/editor" target="_blank">JSONCrack 編輯器</a> 協助修復。</p>';
                echo '<p>也可以重新複製 <a href="' . plugin_dir_url(__FILE__) . '../includes/api/default-chatflow.json" target="_blank">預設格式</a> 重新貼上。</p>';
            },
            'chatbot-config-page'       // ✅ 頁面 ID 要與 form 裡一致
        );
  
        add_settings_field(
            'chatbot_flows_json',             // 欄位 ID
            '聊天流程 JSON',                  // 標籤
            'chatbot_flows_json_callback',    // callback
            'chatbot-config-page',            // ✅ 要和上面 match
            'chatbot_settings_section'        // section ID
        );
    }
  }

/**
 * 3. 驗證輸入的 JSON 格式
 */
function chatbot_validate_json($input) {
    json_decode($input);
    if (json_last_error() !== JSON_ERROR_NONE) {
      add_settings_error(
        'chatbot_flows_json',
        'json_error',
        '聊天流程 JSON 格式錯誤，請檢查。',
        'error'
      );
      // 回傳原本的舊值，拒絕儲存錯誤的輸入
      return get_option('chatbot_flows_json');
    }
    return $input; // 驗證通過，正常儲存
  }

/**
 * 4. 輸出設定欄位（textarea）
 */

 function chatbot_flows_json_callback() {
    $value = get_option('chatbot_flows_json');
    echo '<textarea name="chatbot_flows_json" rows="20" style="width:100%;">' . esc_textarea($value) . '</textarea>';
  
    // 顯示範例區塊
    $path = dirname(__DIR__) . '/includes/api/default-chatflow.json';
    if (file_exists($path)) {
        $example_json = file_get_contents($path);
        echo '<h3>範例格式參考：</h3>';
        echo '<pre style="background:#f6f8fa; padding:1em; border:1px solid #ccc; overflow:auto;">' 
            . esc_html($example_json) . 
            '</pre>';
    } else {
        echo '<p style="color:red;">無法載入預設範例檔案。</p>';
    }
  }
  


/**
 * 6. 設定頁面 HTML 輸出，並載入必要資源
 */
// 先定義 callback 函數，避免載入順序問題
if (!function_exists('chatbot_config_page_callback')) {
    function chatbot_config_page_callback() {
        ?>
        <div class="wrap">
            <h1>聊天機器人設定</h1>
            <form method="post" action="options.php">
                <?php
                settings_fields('chatbot_options_group');
                do_settings_sections('chatbot-config-page');
                submit_button('儲存設定');
                ?>
            </form>
        </div>
        
        <script type="text/javascript">
        jQuery(document).ready(function($) {
            // 初始化顏色選擇器
            if ($.fn.wpColorPicker) {
                $('#chat_color').wpColorPicker();
                console.log('Color picker initialized');
            } else {
                console.log('wpColorPicker not available');
                // 後備方案
                $('#chat_color').attr('type', 'color');
            }
        });
        </script>
        <?php
    }
}

/**
 * 7. 載入頁面專用腳本與樣式
 */
// 載入必要的腳本和樣式
add_action('admin_enqueue_scripts', function($hook) {
    // 只在我們的設定頁面載入
    if ($hook !== 'toplevel_page_chatbot-config-page') {
        return;
    }
    
    wp_enqueue_style('wp-color-picker');
    wp_enqueue_script('wp-color-picker');
});