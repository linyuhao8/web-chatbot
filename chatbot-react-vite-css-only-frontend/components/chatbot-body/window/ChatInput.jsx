import { IoIosSend } from "react-icons/io";
const ChatInput = ({
  userInput,
  setUserInput,
  setMessages,
  handleBotResponse,
}) => {
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
  return (
    <>
      <div className="chat-input-area">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="為毛孩問點什麼..."
          className="chat-input"
        />
        <button
          onClick={handleSendMessage}
          disabled={!userInput.trim()}
          className="chat-send-btn"
        >
          <IoIosSend style={{ width: "15px", height: "15px" }} />
        </button>
      </div>
    </>
  );
};
export default ChatInput;
