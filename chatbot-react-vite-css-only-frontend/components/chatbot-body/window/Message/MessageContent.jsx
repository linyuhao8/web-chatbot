import { FaInstagram, FaFacebook, FaLine } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { GoGift } from "react-icons/go";
import { MdEmail } from "react-icons/md";
import "../../../style/res-style/product-grid.css";
import "../../../style/res-style/promotion-list.css";
import "../../../style/res-style/line-benefits.css";
import "../../../style/res-style/contact-method.css";
import "../../../style/res-style/guide-card.css";
import "../../../style/chat-window.css";

const MessageContent = ({ content }) => {
  if (!content) return null;
  const ICON_MAP = {
    line: <FaLine />,
    facebook: <FaFacebook />,
    instagram: <FaInstagram />,
    email: <MdEmail />,
    gift: <GoGift style={{ width: "4rem", height: "4rem", opacity: 0.2 }} />,
  };
  switch (content.type) {
    case "product_grid":
      return (
        <div className="chat-product-grid-container">
          <h4 className="product-grid-title">{content.title}</h4>
          <div className="product-grid-list">
            {content.products?.map((product, idx) => (
              <div key={idx} className="product-item">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                  width={500}
                  height={500}
                />
                <div className="product-details">
                  <div className="product-name">{product.name}</div>
                  <div className="product-meta">
                    <span className="product-price">{product.price}</span>
                    <span className="product-rating">{product.rating}</span>
                  </div>
                  {product.badge && (
                    <span className="product-badge">{product.badge}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          {content.cta && (
            <a
              href={content.cta.link}
              target="_blank"
              rel="noopener noreferrer"
              className="product-cta-button"
            >
              {content.cta.text}
              <FiExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      );

    case "promotion_cards":
      return (
        <div className="chat-promotion-list">
          {content.promotions?.map((promo, idx) => (
            <div
              key={idx}
              style={{ backgroundColor: promo.color }}
              className="promotion-card "
            >
              <div className="promotion-content">
                <div className="promotion-header">
                  <h5 className="promotion-title">{promo.title}</h5>
                  <span className="promotion-discount">{promo.discount}</span>
                </div>
                <p className="promotion-description">{promo.description}</p>
                {promo.code && (
                  <div className="promotion-code">優惠碼：{promo.code}</div>
                )}
              </div>
              <div className="promotion-icon">
                <GoGift
                  style={{ width: "4rem", height: "4rem", opacity: 0.2 }}
                />
              </div>
            </div>
          ))}
        </div>
      );

    case "line_benefits":
      return (
        <div className="chat-line-benefits-card">
          <h4 className="line-benefits-title">{content.title}</h4>
          <div className="line-benefits-grid">
            <div className="line-benefits-list">
              <ul className="benefits-ul">
                {content.benefits?.map((benefit, idx) => (
                  <li key={idx} className="benefits-li">
                    <span className="benefits-check">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="line-id-box">
                <p className="line-id-label">LINE ID</p>
                <p className="line-id-value">{content.lineId}</p>
              </div>
            </div>
            <div className="line-qr-section">
              {/* <img src={content.qrCode} ... /> */}
              <p className="line-qr-text">
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
        <div className="chat-contact-methods-card">
          <h4 className="contact-methods-title">{content.title}</h4>

          <div className="contact-methods-list">
            {content.methods?.map((method, idx) => (
              <div key={idx} className="contact-method-item">
                <a href="https://lin.ee/F0M1p4v" target="_blank">
                  <div className="contact-method-header">
                    <div className="contact-method-icon">
                      {ICON_MAP[method.icon]}
                    </div>
                    <h5 className="contact-method-name">{method.name}</h5>
                  </div>
                  <p className="contact-method-desc">{method.description}</p>
                  <p className="contact-method-info">{method.info}</p>
                </a>
              </div>
            ))}
          </div>

          <div className="contact-social-section">
            <h5 className="contact-social-title">🌟 關注我們的社群</h5>
            <div className="contact-social-links">
              {content.socialLinks?.map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-link"
                  title={social.name}
                >
                  {ICON_MAP[social.icon]}
                </a>
              ))}
            </div>
          </div>
        </div>
      );

    case "guide_cards":
      return (
        <div className="chat-guide-cards-wrapper">
          {content.guides?.map((guide, idx) => (
            <div key={idx} className="guide-card">
              <div className="guide-card-body">
                <div className="guide-icon">{guide.icon}</div>
                <div className="guide-content">
                  <h5 className="guide-title">{guide.title}</h5>
                  <ul className="guide-list">
                    {guide.items?.map((item, itemIdx) => (
                      <li key={itemIdx} className="guide-item">
                        <span className="guide-bullet">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  {guide.link && (
                    <a
                      href={guide.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="guide-link"
                    >
                      了解更多
                      <FiExternalLink className="guide-link-icon" />
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
export default MessageContent;
