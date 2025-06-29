---
# 🐾 Chat Widget Plugin

這是一個使用 **React + Vite** 開發的 WordPress 聊天外掛，用來建立互動式導購或客服聊天機器人。內容支援商品卡片、優惠訊息、LINE 加好友等多種行為，並可由 WordPress 後台以 JSON 設定。
外部有其他部分是NEXTJS和React+Vite的專案結構。
---

## 🔧 開發與打包

```bash
npm install         # 安裝依賴
npm run dev         # 啟動開發模式
npm run build       # 打包至 build/ 資料夾
```

---

## 📤 上傳至 WordPress 外掛

1. 執行 `npm run build`。
2. 將 `build/` 資料夾中的內容複製到根目錄。
3. **只保留以下 4 個項目**：

   - `chat-widget.php`
   - `include/` 資料夾
   - `admin/` 資料夾
   - `build/` 資料夾（剛剛產生的）

4. 移除其他檔案（如 `src/`, `node_modules/`, `vite.config.js` 等）。
5. 將剩餘檔案壓縮為 ZIP 上傳至 WordPress 外掛即可啟用。

---

## ⚙️ 聊天流程（Chat Flow）設定

所有聊天邏輯皆來自 WordPress 後台儲存的 JSON 設定，前端會透過 API 自動載入：

API 路徑：

```
/wp-json/chatbot/v1/settings
```

[完整預設格式](./includes/api/default-chatflow.json)
範例格式如下：

```json
{
  "welcome": {
    "id": "welcome",
    "type": "bot",
    "message": "🐾 歡迎光臨，我是小汪，今天想了解什麼呢？",
    "options": [
      { "text": "🐕 狗狗用品", "action": "dog_products" },
      { "text": "📞 客服協助", "action": "customer_service" }
    ],
    "delay": 1000
  },
  "dog_products": {
    "id": "dog_products",
    "type": "bot",
    "message": "為狗狗準備的精選好物來了！",
    "content": {
      "type": "product_grid",
      "title": "🏆 熱銷商品",
      "products": [
        {
          "name": "天然無穀狗糧",
          "price": "NT$ 880",
          "rating": "4.9★",
          "image": "圖片網址",
          "badge": "熱銷NO.1"
        }
      ],
      "cta": {
        "text": "查看更多",
        "link": "https://你的網站/shop"
      }
    },
    "options": [{ "text": "🏠 返回首頁", "action": "welcome" }],
    "delay": 1500
  }
}
```

---

## 🚀 支援的 `action` 指令

```
| Action 名稱                       功能描述
| ------------------------------ | -------------------- |
| `add_line`                     | 開啟 LINE 加好友連結
| `call_service`                 | 撥打電話
| `send_email`                   | 開啟預設信箱寄信視窗
| `shop_now`                     | 導向購物頁
| `go_returnexchange-policy`     | 跳轉退換貨頁面
| `go_customized-product-policy` | 跳轉客製化商品說明
| `go_privacy-policy`            | 跳轉隱私權政策頁面
| `https://your-link.com`        | 直接開啟任意網址
```

---

## 🧩 元件結構

```
| 元件          | 描述
| ------------- | ----------------------
| `ChatWindow`  | 聊天視窗主元件
| `ChatHeader`  | 視窗頂部標題與關閉按鈕
| `ChatMessage` | 顯示對話訊息與選項
| `ChatInput`   | 使用者輸入欄位
```

---

## 🗂 樣式與自訂

CSS 請見：

```
component/style/chat-window.css
component/style/chat-button.css
component/style/res-style/contact-method.css
component/style/res-style/guide-card.css
component/style/res-style/line-benefits.css
component/style/res-style/product-grid.css
component/style/res-style/promotion-list.css
```

---
