// src/components/ShareNow.jsx
import React, { useState } from "react";
import "../css/ShareNow.css"; // ✅ Assumes ShareNow.css is in same folder
import { handleShare } from "../utils/helpers";

const ShareNow = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

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
