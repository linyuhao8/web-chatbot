import { FaCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const ChatHeader = ({ setIsOpen, siteUrl }) => {
  return (
    <>
      <div className="chat-header">
        <div className="chat-header-left">
          {/* <div className="chat-avatar">🐾</div> */}
          <img
            src={`${siteUrl}/wp-content/uploads/2025/06/dog-headshot.png`}
            className="chat-avatar"
          />
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
