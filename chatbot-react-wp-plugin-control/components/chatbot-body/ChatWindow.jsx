import { useState, useEffect, useRef, useCallback } from "react";
import "../style/chat-window.css";
import ChatMessage from "./window/Message/ChatMessage";
import ChatHeader from "./window/ChatHeader";
import ChatInput from "./window/ChatInput";

//物件儲存
// const CHAT_FLOWS = {
//   welcome: {
//     id: "welcome",
//     type: "bot",
//     message:
//       "🐾 歡迎來到毛孩天堂！我是專屬寵物顧問小汪，很開心為您和毛孩服務！今天想為您的寶貝找什麼呢？",
//     options: [
//       { text: "🐕 狗狗用品", action: "dog_products" },
//       { text: "💰 優惠活動", action: "promotions" },
//       { text: "📞 客服協助", action: "customer_service" },
//       { text: "🔐 政策說明", action: "return_policy" },
//     ],
//     delay: 1000,
//   },
//   dog_products: {
//     id: "dog_products",
//     type: "bot",
//     message: "🐕 為狗狗準備的精選好物來了！我們有最受毛家長喜愛的商品：",
//     content: {
//       type: "product_grid",
//       title: "🏆 狗狗熱銷商品",
//       products: [
//         {
//           name: "天然無穀狗糧",
//           price: "NT$ 880",
//           rating: "4.9★",
//           image:
//             "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=300&h=200&fit=crop",
//           badge: "熱銷NO.1",
//         },
//         {
//           name: "互動益智玩具",
//           price: "NT$ 450",
//           rating: "4.8★",
//           image:
//             "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=200&fit=crop",
//           badge: "新品",
//         },
//         {
//           name: "舒適牽引繩",
//           price: "NT$ 680",
//           rating: "4.9★",
//           image:
//             "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=200&fit=crop",
//           badge: "推薦",
//         },
//       ],
//       cta: {
//         text: "查看所有狗狗用品",
//         link: `https://dev-petopia25.pantheonsite.io`,
//       },
//     },
//     options: [
//       { text: "🍖 刺繡商品", action: "dog_food" },
//       { text: "🧸 生活", action: "dog_toys" },
//       { text: "🏠 返回首頁", action: "welcome" },
//     ],
//     delay: 1500,
//   },
//   promotions: {
//     id: "promotions",
//     type: "bot",
//     message: "🎉 超值優惠活動進行中！毛孩家長們千萬不要錯過：",
//     content: {
//       type: "promotion_cards",
//       title: "🔥 限時優惠活動",
//       promotions: [
//         {
//           title: "新會員專享",
//           discount: "85折",
//           description: "註冊後加入官方LINE領取優惠券",
//           code: "",
//           color: "#F5F0D8",
//         },
//         {
//           title: "滿額免運",
//           discount: "免運費",
//           description: "全館滿799免運費到府",
//           code: "",
//           color: "#BBD2E4",
//         },
//       ],
//     },
//     options: [
//       { text: "🛒 馬上購物", action: "shop_now" },
//       { text: "🏠 返回首頁", action: "welcome" },
//     ],
//     delay: 2000,
//   },
//   line_discount: {
//     id: "line_discount",
//     type: "bot",
//     message: "🎁 太棒了！加LINE好友立享多重好禮：",
//     content: {
//       type: "line_benefits",
//       title: "🎉 LINE好友專屬福利",
//       benefits: [
//         "💰 新好友立領100元購物金",
//         "🎫 每月專屬優惠券",
//         "⚡ 限時快閃活動搶先知",
//         "🆕 新品上市優先體驗",
//         "🎂 生日月享特別優惠",
//         "📱 專屬客服快速回覆",
//       ],
//       qrCode:
//         "https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=https://line.me/R/ti/p/your-line-id",
//       lineId: "@petstore",
//     },
//     options: [
//       { text: "📱 點我加LINE好友", action: "add_line" },
//       { text: "🛒 直接購物", action: "shop_now" },
//       { text: "🏠 返回首頁", action: "welcome" },
//     ],
//     delay: 1500,
//   },
//   newbie_guide: {
//     id: "newbie_guide",
//     type: "bot",
//     message: "🐾 恭喜成為毛孩家長！新手養寵不用慌，我們為您準備了完整指南：",
//     content: {
//       type: "guide_cards",
//       title: "📖 新手養寵指南",
//       guides: [
//         {
//           icon: "🍽️",
//           title: "飲食營養",
//           items: ["選擇適齡飼料", "定時定量餵食", "充足飲水供應"],
//           link: "https://example.com/feeding-guide",
//         },
//         {
//           icon: "🏥",
//           title: "健康照護",
//           items: ["疫苗接種時程", "定期健康檢查", "日常清潔護理"],
//           link: "https://example.com/health-guide",
//         },
//         {
//           icon: "🎓",
//           title: "行為訓練",
//           items: ["基礎服從訓練", "社會化培養", "問題行為矯正"],
//           link: "https://example.com/training-guide",
//         },
//       ],
//     },
//     options: [
//       { text: "🛒 新手必備用品包", action: "starter_kit" },
//       { text: "🎁 加LINE獲取完整指南", action: "line_discount" },
//       { text: "💬 預約專家諮詢", action: "expert_consultation" },
//       { text: "🏠 返回首頁", action: "welcome" },
//     ],
//     delay: 2000,
//   },
//   customer_service: {
//     id: "customer_service",
//     type: "bot",
//     message: "📞 我們提供多元化的客服管道，讓您隨時都能獲得最棒的服務：",
//     content: {
//       type: "contact_methods",
//       title: "📱 聯繫我們",
//       methods: [
//         {
//           icon: "line", // 只放字串 key
//           name: "LINE客服",
//           info: "@petstore",
//           description: "加LINE好友享即時客服",
//           color: "bg-green-500",
//           action: "add_line",
//         },
//       ],
//       socialLinks: [
//         {
//           name: "Instagram",
//           icon: "instagram",
//           link: "https://www.instagram.com/petopia_tw/",
//           color: "bg-pink-500",
//         },
//       ],
//     },
//     options: [{ text: "🏠 返回首頁", action: "welcome" }],
//     delay: 1500,
//   },
//   return_policy: {
//     id: "return_policy",
//     type: "bot",
//     message: "📦 點選下方選項了解我們的退換貨與隱私政策：",
//     options: [
//       {
//         text: "退換貨說明",
//         action: "go_returnexchange-policy",
//       },
//       {
//         text: "客製化商品說明",
//         action: "go_customized-product-policy",
//       },
//       { text: "隱私權政策", action: "go_privacy-policy" },
//       { text: "🏠 返回首頁", action: "welcome" },
//     ],
//     delay: 800,
//   },
//   faq: {
//     id: "faq",
//     type: "bot",
//     message: "❓ 以下是最常見的問題，點擊查看詳細說明：",
//     options: [
//       { text: "📦 訂單與出貨問題", action: "https://example.com/faq#shipping" },
//       { text: "💳 付款與退款問題", action: "https://example.com/faq#payment" },
//       { text: "📱 會員與帳號問題", action: "https://example.com/faq#account" },
//       { text: "🏠 返回首頁", action: "welcome" },
//     ],
//     delay: 800,
//   },
// };

// api json exsample
// const json_CHAT_FLOW = {
//   "welcome": {
//     "id": "welcome",
//     "type": "bot",
//     "message": "🐾 歡迎來到毛孩天堂！我是專屬寵物顧問小汪，很開心為您和毛孩服務！今天想為您的寶貝找什麼呢？",
//     "options": [
//       { "text": "🐕 狗狗用品", "action": "dog_products" },
//       { "text": "💰 優惠活動", "action": "promotions" },
//       { "text": "📞 客服協助", "action": "customer_service" },
//       { "text": "🔐 政策說明", "action": "return_policy" }
//     ],
//     "delay": 1000
//   },
//   "dog_products": {
//     "id": "dog_products",
//     "type": "bot",
//     "message": "🐕 為狗狗準備的精選好物來了！我們有最受毛家長喜愛的商品：",
//     "content": {
//       "type": "product_grid",
//       "title": "🏆 狗狗熱銷商品",
//       "products": [
//         {
//           "name": "天然無穀狗糧",
//           "price": "NT$ 880",
//           "rating": "4.9★",
//           "image": "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=300&h=200&fit=crop",
//           "badge": "熱銷NO.1"
//         },
//         {
//           "name": "互動益智玩具",
//           "price": "NT$ 450",
//           "rating": "4.8★",
//           "image": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=200&fit=crop",
//           "badge": "新品"
//         },
//         {
//           "name": "舒適牽引繩",
//           "price": "NT$ 680",
//           "rating": "4.9★",
//           "image": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=200&fit=crop",
//           "badge": "推薦"
//         }
//       ],
//       "cta": {
//         "text": "查看所有狗狗用品",
//         "link": "https://dev-petopia25.pantheonsite.io"
//       }
//     },
//     "options": [
//       { "text": "🍖 刺繡商品", "action": "dog_food" },
//       { "text": "🧸 生活", "action": "dog_toys" },
//       { "text": "🏠 返回首頁", "action": "welcome" }
//     ],
//     "delay": 1500
//   },
//   "promotions": {
//     "id": "promotions",
//     "type": "bot",
//     "message": "🎉 超值優惠活動進行中！毛孩家長們千萬不要錯過：",
//     "content": {
//       "type": "promotion_cards",
//       "title": "🔥 限時優惠活動",
//       "promotions": [
//         {
//           "title": "新會員專享",
//           "discount": "85折",
//           "description": "註冊後加入官方LINE領取優惠券",
//           "code": "",
//           "color": "#F5F0D8"
//         },
//         {
//           "title": "滿額免運",
//           "discount": "免運費",
//           "description": "全館滿799免運費到府",
//           "code": "",
//           "color": "#BBD2E4"
//         }
//       ]
//     },
//     "options": [
//       { "text": "🛒 馬上購物", "action": "shop_now" },
//       { "text": "🏠 返回首頁", "action": "welcome" }
//     ],
//     "delay": 2000
//   },
//   "line_discount": {
//     "id": "line_discount",
//     "type": "bot",
//     "message": "🎁 太棒了！加LINE好友立享多重好禮：",
//     "content": {
//       "type": "line_benefits",
//       "title": "🎉 LINE好友專屬福利",
//       "benefits": [
//         "💰 新好友立領100元購物金",
//         "🎫 每月專屬優惠券",
//         "⚡ 限時快閃活動搶先知",
//         "🆕 新品上市優先體驗",
//         "🎂 生日月享特別優惠",
//         "📱 專屬客服快速回覆"
//       ],
//       "qrCode": "https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=https://line.me/R/ti/p/your-line-id",
//       "lineId": "@petstore"
//     },
//     "options": [
//       { "text": "📱 點我加LINE好友", "action": "add_line" },
//       { "text": "🛒 直接購物", "action": "shop_now" },
//       { "text": "🏠 返回首頁", "action": "welcome" }
//     ],
//     "delay": 1500
//   },
//   "newbie_guide": {
//     "id": "newbie_guide",
//     "type": "bot",
//     "message": "🐾 恭喜成為毛孩家長！新手養寵不用慌，我們為您準備了完整指南：",
//     "content": {
//       "type": "guide_cards",
//       "title": "📖 新手養寵指南",
//       "guides": [
//         {
//           "icon": "🍽️",
//           "title": "飲食營養",
//           "items": ["選擇適齡飼料", "定時定量餵食", "充足飲水供應"],
//           "link": "https://example.com/feeding-guide"
//         },
//         {
//           "icon": "🏥",
//           "title": "健康照護",
//           "items": ["疫苗接種時程", "定期健康檢查", "日常清潔護理"],
//           "link": "https://example.com/health-guide"
//         },
//         {
//           "icon": "🎓",
//           "title": "行為訓練",
//           "items": ["基礎服從訓練", "社會化培養", "問題行為矯正"],
//           "link": "https://example.com/training-guide"
//         }
//       ]
//     },
//     "options": [
//       { "text": "🛒 新手必備用品包", "action": "starter_kit" },
//       { "text": "🎁 加LINE獲取完整指南", "action": "line_discount" },
//       { "text": "💬 預約專家諮詢", "action": "expert_consultation" },
//       { "text": "🏠 返回首頁", "action": "welcome" }
//     ],
//     "delay": 2000
//   },
//   "customer_service": {
//     "id": "customer_service",
//     "type": "bot",
//     "message": "📞 我們提供多元化的客服管道，讓您隨時都能獲得最棒的服務：",
//     "content": {
//       "type": "contact_methods",
//       "title": "📱 聯繫我們",
//       "methods": [
//         {
//           "icon": "line",
//           "name": "LINE客服",
//           "info": "@petstore",
//           "description": "加LINE好友享即時客服",
//           "color": "bg-green-500",
//           "action": "add_line"
//         }
//       ],
//       "socialLinks": [
//         {
//           "name": "Instagram",
//           "icon": "instagram",
//           "link": "https://www.instagram.com/petopia_tw/",
//           "color": "bg-pink-500"
//         }
//       ]
//     },
//     "options": [
//       { "text": "🏠 返回首頁", "action": "welcome" }
//     ],
//     "delay": 1500
//   },
//   "return_policy": {
//     "id": "return_policy",
//     "type": "bot",
//     "message": "📦 點選下方選項了解我們的退換貨與隱私政策：",
//     "options": [
//       { "text": "退換貨說明", "action": "go_returnexchange-policy" },
//       { "text": "客製化商品說明", "action": "go_customized-product-policy" },
//       { "text": "隱私權政策", "action": "go_privacy-policy" },
//       { "text": "🏠 返回首頁", "action": "welcome" }
//     ],
//     "delay": 800
//   },
//   "faq": {
//     "id": "faq",
//     "type": "bot",
//     "message": "❓ 以下是最常見的問題，點擊查看詳細說明：",
//     "options": [
//       { "text": "📦 訂單與出貨問題", "action": "https://example.com/faq#shipping" },
//       { "text": "💳 付款與退款問題", "action": "https://example.com/faq#payment" },
//       { "text": "📱 會員與帳號問題", "action": "https://example.com/faq#account" },
//       { "text": "🏠 返回首頁", "action": "welcome" }
//     ],
//     "delay": 800
//   }
// };

const ChatWindow = ({ isOpen, setIsOpen }) => {
  const [chatFlows, setChatFlows] = useState({});
  const [messages, setMessages] = useState([]);
  const [_currentFlow, setCurrentFlow] = useState("welcome");
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState("");
  const messagesEndRef = useRef(null);

  const [siteUrl, _setSiteUrl] = useState(() => window.WP_DATA?.siteUrl ?? "");
  const restUrl = window.WP_DATA?.restUrl ?? "";
  const nonce = window.WP_DATA?.nonce ?? "";

  useEffect(() => {
    if (!restUrl) return;

    const fetchData = async () => {
      try {
        console.log("restUrl", restUrl);
        const res = await fetch(`${restUrl}chatbot/v1/settings`, {
          headers: {
            "Content-Type": "application/json",
            "X-WP-Nonce": nonce,
          },
        });
        const json = await res.json();
        console.log(json);
        setChatFlows(json);
      } catch (error) {
        console.error("載入 chatFlows 失敗", error);
      }
    };

    fetchData();
  }, [restUrl, nonce]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleBotResponse = useCallback(
    (flowId, delay = 0) => {
      const flow = chatFlows[flowId];
      if (!flow) return;

      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        const botMessage = {
          id: Date.now(),
          type: "bot",
          text: flow.message,
          content: flow.content,
          options: flow.options,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setCurrentFlow(flowId);
      }, delay || flow.delay || 500);
    },
    [chatFlows]
  );

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      handleBotResponse("welcome");
    }
  }, [isOpen, messages.length, handleBotResponse]);

  const handleUserMessage = (text, action) => {
    const userMessage = {
      id: Date.now(),
      type: "user",
      text: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    if (action === "add_line") {
      window.open("https://line.me/R/ti/p/@petstore", "_blank");
      return;
    }

    if (action === "call_service") {
      window.location.href = "tel:02-1234-5678";
      return;
    }

    if (action === "send_email") {
      window.location.href = "mailto:service@petstore.com";
      return;
    }

    if (action === "shop_now") {
      window.location.href = `${siteUrl}/shop`;
      return;
    }

    if (action === "go_returnexchange-policy") {
      window.location.href = `${siteUrl}/returnexchange-policy`;
      return;
    }
    if (action === "go_customized-product-policy") {
      window.location.href = `${siteUrl}/customized-product-policy`;
      return;
    }
    if (action === "go_privacy-policy") {
      window.location.href = `${siteUrl}/privacy-policy`;
      return;
    }

    if (action) {
      setTimeout(() => handleBotResponse(action), 500);
    }
  };

  const handleOptionClick = (option) => {
    handleUserMessage(option.text, option.action);
  };

  return (
    <>
      {/* 聊天視窗 */}
      {isOpen && (
        <div className="chat-window">
          <ChatHeader setIsOpen={setIsOpen} siteUrl={siteUrl} />

          <ChatMessage
            messages={messages}
            handleOptionClick={handleOptionClick}
            isTyping={isTyping}
            messagesEndRef={messagesEndRef}
          />
          <ChatInput
            userInput={userInput}
            setUserInput={setUserInput}
            setMessages={setMessages}
            handleBotResponse={handleBotResponse}
          />
        </div>
      )}
    </>
  );
};

export default ChatWindow;
