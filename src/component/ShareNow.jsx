// src/components/ShareNow.jsx
import React, { useState } from "react";
import "../css/ShareNow.css"; // ✅ Assumes ShareNow.css is in same folder

const ShareNow = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  // sharenow button
  const shareLink = window.location.href;
  const handleShare = () => {
    const message = encodeURIComponent(
      ` Havesta is currently crowdfunding to bring our MVP to life 🚀.\n\nWith your support, we can create a digital product that connects farmers directly to customers—making Fresh Farm Produce, Healthy Livestock, and other Agri-Inputs accessible to all while transforming agriculture in Nigeria.\n\nThis initiative has huge growth potential and we’re inviting you to be part of the early supporters who will make this vision possible.\n\n✨ Every donation makes a difference.\n\n📢 Please Donate today & help share this with your friends!\n\nCheck it out here: ${shareLink}`
    );
    const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
    window.open(whatsappUrl, "_blank");
    handleClose(); // Close modal after sharing
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        className="w-full cursor-pointer text-center rounded-3xl  textgreen bg-white font-bold py-4 px-2 "
        onClick={handleShare}
      >
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
          </div>
        </div>
      )}
    </>
  );
};

export default ShareNow;
