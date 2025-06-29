<?php 
add_action('rest_api_init', function () {
  register_rest_route('chatbot/v1', '/settings', [
      'methods'  => 'GET',
      'callback' => 'faq_widget_get_settings',
      'permission_callback' => '__return_true', // 不驗證登入
  ]);
});

function faq_widget_get_settings() {
  $chatbot_json = get_option('chatbot_flows_json');
  $chatbot_flows = json_decode($chatbot_json, true);
  return $chatbot_flows;
}
