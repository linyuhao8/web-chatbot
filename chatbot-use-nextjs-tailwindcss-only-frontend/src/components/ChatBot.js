"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaInstagram, FaFacebook, FaLine, FaCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { LuMessageCircleMore } from "react-icons/lu";
import { FiExternalLink } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { GoGift } from "react-icons/go";
// 寵物電商聊天流程配置
const CHAT_FLOWS = {
  welcome: {
    id: "welcome",
    type: "bot",
    message:
      "🐾 歡迎來到毛孩天堂！我是專屬寵物顧問小汪，很開心為您和毛孩服務！今天想為您的寶貝找什麼呢？",
    options: [
      { text: "🐕 狗狗用品", action: "dog_products" },
      { text: "💰 優惠活動", action: "promotions" },
      { text: "📞 客服協助", action: "customer_service" },
      { text: "🔐 政策說明", action: "return_policy" },
    ],
    delay: 1000,
  },
  dog_products: {
    id: "dog_products",
    type: "bot",
    message: "🐕 為狗狗準備的精選好物來了！我們有最受毛家長喜愛的商品：",
    content: {
      type: "product_grid",
      title: "🏆 狗狗熱銷商品",
      products: [
        {
          name: "天然無穀狗糧",
          price: "NT$ 880",
          rating: "4.9★",
          image:
            "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=300&h=200&fit=crop",
          badge: "熱銷NO.1",
        },
        {
          name: "互動益智玩具",
          price: "NT$ 450",
          rating: "4.8★",
          image:
            "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=200&fit=crop",
          badge: "新品",
        },
        {
          name: "舒適牽引繩",
          price: "NT$ 680",
          rating: "4.9★",
          image:
            "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=200&fit=crop",
          badge: "推薦",
        },
      ],
      cta: {
        text: "查看所有狗狗用品",
        link: `https://dev-petopia25.pantheonsite.io`,
      },
    },
    options: [
      { text: "🍖 刺繡商品", action: "dog_food" },
      { text: "🧸 生活", action: "dog_toys" },
      { text: "🏠 返回首頁", action: "welcome" },
    ],
    delay: 1500,
  },
  promotions: {
    id: "promotions",
    type: "bot",
    message: "🎉 超值優惠活動進行中！毛孩家長們千萬不要錯過：",
    content: {
      type: "promotion_cards",
      title: "🔥 限時優惠活動",
      promotions: [
        {
          title: "新會員專享",
          discount: "85折",
          description: "註冊後加入官方LINE領取優惠券",
          code: "",
          color: "bg-[#F5F0D8]",
        },
        {
          title: "滿額免運",
          discount: "免運費",
          description: "全館滿799免運費到府",
          code: "",
          color: "bg-[#BBD2E4]",
        },
      ],
    },
    options: [
      { text: "🛒 馬上購物", action: "shop_now" },
      { text: "🏠 返回首頁", action: "welcome" },
    ],
    delay: 2000,
  },
  line_discount: {
    id: "line_discount",
    type: "bot",
    message: "🎁 太棒了！加LINE好友立享多重好禮：",
    content: {
      type: "line_benefits",
      title: "🎉 LINE好友專屬福利",
      benefits: [
        "💰 新好友立領100元購物金",
        "🎫 每月專屬優惠券",
        "⚡ 限時快閃活動搶先知",
        "🆕 新品上市優先體驗",
        "🎂 生日月享特別優惠",
        "📱 專屬客服快速回覆",
      ],
      qrCode:
        "https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=https://line.me/R/ti/p/your-line-id",
      lineId: "@petstore",
    },
    options: [
      { text: "📱 點我加LINE好友", action: "add_line" },
      { text: "🛒 直接購物", action: "shop_now" },
      { text: "🏠 返回首頁", action: "welcome" },
    ],
    delay: 1500,
  },
  newbie_guide: {
    id: "newbie_guide",
    type: "bot",
    message: "🐾 恭喜成為毛孩家長！新手養寵不用慌，我們為您準備了完整指南：",
    content: {
      type: "guide_cards",
      title: "📖 新手養寵指南",
      guides: [
        {
          icon: "🍽️",
          title: "飲食營養",
          items: ["選擇適齡飼料", "定時定量餵食", "充足飲水供應"],
          link: "https://example.com/feeding-guide",
        },
        {
          icon: "🏥",
          title: "健康照護",
          items: ["疫苗接種時程", "定期健康檢查", "日常清潔護理"],
          link: "https://example.com/health-guide",
        },
        {
          icon: "🎓",
          title: "行為訓練",
          items: ["基礎服從訓練", "社會化培養", "問題行為矯正"],
          link: "https://example.com/training-guide",
        },
      ],
    },
    options: [
      { text: "🛒 新手必備用品包", action: "starter_kit" },
      { text: "🎁 加LINE獲取完整指南", action: "line_discount" },
      { text: "💬 預約專家諮詢", action: "expert_consultation" },
      { text: "🏠 返回首頁", action: "welcome" },
    ],
    delay: 2000,
  },
  customer_service: {
    id: "customer_service",
    type: "bot",
    message: "📞 我們提供多元化的客服管道，讓您隨時都能獲得最棒的服務：",
    content: {
      type: "contact_methods",
      title: "📱 聯繫我們",
      methods: [
        {
          icon: <FaLine className="text-gray-500" />,
          name: "LINE客服",
          info: "@petstore",
          description: "加LINE好友享即時客服",
          color: "bg-green-500",
          action: "add_line",
        },
      ],
      socialLinks: [
        {
          name: "Facebook",
          icon: <FaFacebook className="text-gray-500" />,
          link: "https://facebook.com/petstore",
          color: "bg-blue-600",
        },
        {
          name: "Instagram",
          icon: <FaInstagram className="text-gray-500" />,
          link: "https://instagram.com/petstore",
          color: "bg-pink-500",
        },
        {
          name: "Email",
          icon: <MdEmail className="text-gray-500" />,
          link: "service@petstore.com",
        },
      ],
    },
    options: [{ text: "🏠 返回首頁", action: "welcome" }],
    delay: 1500,
  },
  return_policy: {
    id: "return_policy",
    type: "bot",
    message: "📦 點選下方選項了解我們的退換貨與隱私政策：",
    options: [
      {
        text: "退換貨說明",
        action: "go_returnexchange-policy",
      },
      {
        text: "客製化商品說明",
        action: "go_customized-product-policy",
      },
      { text: "隱私權政策", action: "go_privacy-policy" },
      { text: "🏠 返回首頁", action: "welcome" },
    ],
    delay: 800,
  },
  faq: {
    id: "faq",
    type: "bot",
    message: "❓ 以下是最常見的問題，點擊查看詳細說明：",
    options: [
      { text: "📦 訂單與出貨問題", action: "https://example.com/faq#shipping" },
      { text: "💳 付款與退款問題", action: "https://example.com/faq#payment" },
      { text: "📱 會員與帳號問題", action: "https://example.com/faq#account" },
      { text: "🏠 返回首頁", action: "welcome" },
    ],
    delay: 800,
  },
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentFlow, setCurrentFlow] = useState("welcome");
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState("");
  const messagesEndRef = useRef(null);
  const [siteUrl, setSetUrl] = useState(
    "https://dev-petopia25.pantheonsite.io"
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      handleBotResponse("welcome");
    }
  }, [isOpen, messages.length]);

  const handleBotResponse = (flowId, delay = 0) => {
    const flow = CHAT_FLOWS[flowId];
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
    }, delay || flow.delay || 1000);
  };

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

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      text: userInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");

    // 簡單的關鍵字回應邏輯
    setTimeout(() => {
      let responseAction = "welcome";
      const input = userInput.toLowerCase();

      if (input.includes("狗") || input.includes("汪"))
        responseAction = "dog_products";
      else if (input.includes("貓") || input.includes("喵"))
        responseAction = "cat_products";
      else if (input.includes("優惠") || input.includes("折扣"))
        responseAction = "promotions";
      else if (input.includes("line")) responseAction = "line_discount";

      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        text: "🐾 感謝您的訊息！讓我為您推薦最適合的商品和服務。",
        options: [
          { text: "🏠 返回首頁", action: "welcome" },
          { text: "🎁 查看優惠", action: "promotions" },
        ],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setTimeout(() => handleBotResponse(responseAction), 1000);
    }, 1000);
  };

  const MessageContent = ({ content }) => {
    if (!content) return null;

    switch (content.type) {
      case "product_grid":
        return (
          <div className="bg-white rounded-lg border border-gray-100 p-4 my-2 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-1">
              {content.title}
            </h4>
            <div className="grid gap-3">
              {content.products?.map((product, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 p-2 border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                    width={500}
                    height={500}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-medium text-xs text-gray-800">
                        {product.name}
                      </h5>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#BBD2E4] font-bold text-sm">
                        {product.price}
                      </span>
                      <span className="text-yellow-500 text-xs">
                        {product.rating}
                      </span>
                    </div>
                    <div>
                      {product.badge && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded text-[10px]">
                          {product.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {content.cta && (
              <a
                href={content.cta.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-[#BBD2E4] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#BBD2E4] transition-colors mt-3 w-full justify-center"
              >
                {content.cta.text}
                <FiExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        );

      case "promotion_cards":
        return (
          <div className="space-y-3 my-2">
            {content.promotions?.map((promo, idx) => (
              <div
                key={idx}
                className={`${promo.color} rounded-lg p-4 text-gray-500 relative overflow-hidden`}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-bold text-sm">{promo.title}</h5>
                    <span className="font-bold text-lg text-gray-700">
                      {promo.discount}
                    </span>
                  </div>
                  <p className="text-xs opacity-90 mb-2">{promo.description}</p>
                  {promo.code && (
                    <div className="bg-white/70 px-2 py-1 rounded text-xs font-mono">
                      優惠碼：{promo.code}
                    </div>
                  )}
                </div>
                <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-1">
                  <GoGift className="w-16 h-16 opacity-20" />
                </div>
              </div>
            ))}
          </div>
        );

      case "line_benefits":
        return (
          <div className="bg-white rounded-lg border border-gray-100 p-4 my-2 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3">
              {content.title}
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <ul className="space-y-2 mb-4">
                  {content.benefits?.map((benefit, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-700 flex items-center gap-2"
                    >
                      <span className="text-green-500">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <div className="bg-green-50 p-3 rounded-lg border border-gray-100 border border-gray-100">
                  <p className="text-sm text-green-800 mb-1">LINE ID</p>
                  <p className="font-mono font-bold text-green-700">
                    {content.lineId}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                {/* <Image
                  src={content.qrCode}
                  alt="LINE QR Code"
                  className="w-32 h-32 border border-gray-100 rounded-lg mb-2"
                  width={500}
                  height={500}
                /> */}
                <p className="text-xs text-gray-600 text-center">
                  掃描QR Code
                  <br />
                  立即加好友
                </p>
              </div>
            </div>
          </div>
        );

      case "contact_methods":
        return (
          <div className="bg-white rounded-lg border border-gray-100 p-4 my-2 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3">
              {content.title}
            </h4>
            <div className="space-y-3 mb-4">
              {content.methods?.map((method, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2 border border-gray-100 rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <div className="flex flex-nowrap gap-2 mb-2 items-start">
                      <div className={`w-4 h-4 text-lg`}>{method.icon}</div>
                      <h5 className="font-medium text-sm text-gray-800">
                        {method.name}
                      </h5>
                    </div>
                    <p className="text-xs text-gray-600">
                      {method.description}
                    </p>
                    <p className="text-sm font-mono text-blue-600">
                      {method.info}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-3">
              <h5 className="font-medium text-sm text-gray-800 mb-2">
                🌟 關注我們的社群
              </h5>
              <div className="flex gap-2">
                {content.socialLinks?.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={` text-black text-xl hover:scale-110 transition-transform`}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        );

      case "guide_cards":
        return (
          <div className="space-y-3 my-2">
            {content.guides?.map((guide, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 rounded-lg p-3"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{guide.icon}</div>
                  <div className="flex-1">
                    <h5 className="font-medium text-sm text-gray-800 mb-2">
                      {guide.title}
                    </h5>
                    <ul className="space-y-1">
                      {guide.items?.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="text-xs text-gray-600 flex items-center gap-1"
                        >
                          <span className="text-[#BBD2E4]">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    {guide.link && (
                      <a
                        href={guide.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-2"
                      >
                        了解更多
                        <FiExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* 聊天按鈕 */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#BBD2E4] text-white rounded-full p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 group relative"
        >
          <div className="relative">
            <LuMessageCircleMore className="w-6 h-6" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-black text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            🐾 需要幫毛孩挑選用品嗎？
          </div>
        </button>
      )}

      {/* 聊天視窗 */}
      {isOpen && (
        <div className="bg-white rounded-xl shadow-2xl w-80 h-96 flex flex-col border border-gray-100 overflow-hidden">
          {/* 標題列 */}
          <div className="bg-[#BBD2E4] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm">🐾</span>
              </div>
              <div>
                <h3 className="font-medium text-sm">毛孩烏托邦</h3>
                <div className="flex flex-nowrap items-center gap-2">
                  <p className="text-xs opacity-90">寵物顧問小汪在線</p>
                  <FaCircle className="h-2 w-2 text-green-500" />
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <IoClose className="w-5 h-5" />
            </button>
          </div>

          {/* 訊息區域 */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gradient-to-b from-[#BBD2E4]to-pink-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] ${
                    message.type === "user" ? "order-2" : "order-1"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-2xl text-sm ${
                      message.type === "user"
                        ? "bg-[#F5F0D8]  text-black rounded-br-sm"
                        : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100"
                    }`}
                  >
                    {message.text}
                  </div>

                  <MessageContent content={message.content} />

                  {message.options && (
                    <div className="mt-2 space-y-1">
                      {message.options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(option)}
                          className="block w-full text-left px-3 py-2 bg-white border border-gray-100 rounded-lg text-sm text-gray-700 hover:bg-[#BBD2E4]hover:border border-gray-100-[#BBD2E4] transition-colors shadow-sm"
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 用戶icon */}
                <div
                  className={`mx-1 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    message.type === "user"
                      ? "bg-[#F5F0D8] text-black order-1 ml-2"
                      : "bg-[#F5F0D8] text-[#F5F0D8] order-2 mr-2"
                  }`}
                >
                  {message.type === "user" ? (
                    <FaRegUser className="w-3 h-3" />
                  ) : (
                    "🐾"
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-[#BBD2E4] rounded-full flex items-center justify-center">
                    <span className="text-xs">🐾</span>
                  </div>
                  <div className="bg-white px-3 py-2 rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#BBD2E4] rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-[#BBD2E4] rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-[#BBD2E4] rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 輸入區域 */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="為毛孩問點什麼..."
                className="text-black flex-1 px-3 py-2 border border-gray-100 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#BBD2E4]"
              />
              <button
                onClick={handleSendMessage}
                disabled={!userInput.trim()}
                className="bg-[#F5F0D8] text-black p-2 rounded-full hover:from-[#BBD2E4] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IoIosSend className="w-5 h-4 text-black" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
