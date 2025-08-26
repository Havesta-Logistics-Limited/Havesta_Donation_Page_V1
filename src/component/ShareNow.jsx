// src/components/ShareNow.jsx
import React, { useState } from "react";
import "../css/ShareNow.css"; // ✅ Assumes ShareNow.css is in same folder

const ShareNow = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const shareLink = window.location.href;
  const subject = "Support Havesta's Agriculture Initiative";
  const body = `Join me in supporting Havesta's mission to build Nigeria's agriculture future! ${shareLink}`;

  const handleShare = (platform) => {
    if (platform === "whatsapp") {
      const url = `https://wa.me/?text=${encodeURIComponent(body)}`;
      window.open(url, "_blank");
    } else if (platform === "gmail") {
      const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailto, "_blank");
    }
    handleClose(); // Close modal after sharing
  };

  return (
    <>
      {/* Trigger Button */}
      <button className="cta-button share-btn" onClick={handleOpen}>
        Share To Others
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleClose}>
              &times;
            </button>
            <h2>Share This Campaign</h2>
            <p>Help us grow by sharing with others</p>
            <div className="share-options">
              <button
                className="share-option whatsapp"
                onClick={() => handleShare("whatsapp")}
              >
                WhatsApp
              </button>
              <button
                className="share-option gmail"
                onClick={() => handleShare("gmail")}
              >
                Gmail
              </button>
            </div>
            <button className="cancel-btn" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareNow;