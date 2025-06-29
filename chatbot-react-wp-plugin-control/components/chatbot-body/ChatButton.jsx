import { LuMessageCircleMore } from "react-icons/lu";
import "../style/chat-button.css"; // ✅ 引入原生 CSS

const ChatButton = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="chat-button group">
          <div className="icon-wrapper">
            <LuMessageCircleMore className="icon" />
          </div>
          <div className="notification-dot"></div>
          <div className="tooltip group-hover">🐾 需要幫毛孩挑選用品嗎？</div>
        </button>
      )}
    </>
  );
};

export default ChatButton;
