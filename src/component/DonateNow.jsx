// src/components/DonateNow.jsx
import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import "./DonateNow.css";

const DonateNow = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;

  const componentProps = {
    email: formData.email,
    amount: parseInt(formData.amount) * 100 || 0,
    publicKey,
    text: "Proceed to Payment",
    onSuccess: (reference) => {
      alert(`Thank you, ${formData.name}! Your donation of ₦${formData.amount} was successful.`);
      setShowModal(false);
      setFormData({ name: "", email: "", amount: "" });
    },
    onClose: () => {
      console.log("Payment closed");
    },
    currency: "NGN",
  };

  return (
    <>
      {/* Trigger Button */}
      <button className="cta-button donate-btn" onClick={handleOpen}>
        Donate Now
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleClose}>
              &times;
            </button>
            <h2>Make a Donation</h2>
            <form>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="amount"
                placeholder="Amount (₦)"
                value={formData.amount}
                onChange={handleInputChange}
                required
              />
              <PaystackButton {...componentProps} className="paystack-btn" />
              <button type="button" className="cancel-btn" onClick={handleClose}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DonateNow;