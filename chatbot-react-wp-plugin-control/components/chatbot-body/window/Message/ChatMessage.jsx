import MessageContent from "./MessageContent";
import { FaRegUser } from "react-icons/fa";

const ChatMessage = ({
  messages,
  handleOptionClick,
  isTyping,
  messagesEndRef,
}) => {
  return (
    <>
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message-wrapper ${message.type}`}>
            <div className="message-bubble-wrapper">
              <div className={`message-bubble ${message.type}`}>
                {message.text}
              </div>

              <MessageContent content={message.content} />

              {message.options && (
                <div className="message-options">
                  {message.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(option)}
                      className="message-option"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className={`message-avatar ${message.type}`}>
              {message.type === "user" ? <FaRegUser /> : "🐾"}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="typing">
            <div className="typing-avatar">🐾</div>
            <div className="typing-indicator">
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </>
  );
};
export default ChatMessage;
