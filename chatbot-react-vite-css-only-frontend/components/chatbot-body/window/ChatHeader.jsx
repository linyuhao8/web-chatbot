import { FaCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const ChatHeader = ({ setIsOpen }) => {
  return (
    <>
      <div className="chat-header">
        <div className="chat-header-left">
          <div className="chat-avatar">🐾</div>
          <div>
            <h3 className="chat-title">毛孩烏托邦</h3>
            <div className="chat-status">
              <p className="chat-subtitle">寵物顧問小咪在線</p>
              <FaCircle className="chat-status-icon" />
            </div>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="chat-close">
          <IoClose />
        </button>
      </div>
    </>
  );
};

export default ChatHeader;
