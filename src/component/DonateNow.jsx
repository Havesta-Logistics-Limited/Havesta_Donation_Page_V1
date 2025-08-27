// src/components/DonateNow.jsx
import React, { useState } from "react";
import "../css/DonateNow.css";

const DonateNow = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  const handlePayment = async () => {
    const { name, email, amount } = formData;
    if (!name || !email || !amount) {
      alert("Please fill all fields");
      return;
    }

    if (!publicKey) {
      alert("Public key missing! Check .env file.");
      return;
    }

    setLoading(true);

    // Create script
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/checkout.js"; // ✅ Fixed URL
    script.async = true;

    script.onload = () => {
      console.log("Script loaded. window.PaystackPop =", window.PaystackPop);

      if (window.PaystackPop) {
        const handler = window.PaystackPop.setup({
          key: publicKey,
          email,
          amount: parseInt(amount) * 100,
          currency: "NGN",
          ref: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          onClose: () => {
            alert("Payment window closed");
            setLoading(false);
          },
          callback: (response) => {
            alert(`🎉 Success! Payment ${response.reference} was successful.`);
            setShowModal(false);
            setFormData({ name: "", email: "", amount: "" });
            setLoading(false);
          },
        });
        handler.openIframe();
      } else {
        console.error("❌ window.PaystackPop is NOT defined");
        alert(
          "Paystack failed to initialize. Script loaded but PaystackPop is missing."
        );
        setLoading(false);
      }
    };

    script.onerror = () => {
      console.error("❌ Failed to load Paystack script");
      alert("Failed to load payment system. Check internet or ad blocker.");
      setLoading(false);
    };

    document.body.appendChild(script);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        className="w-full cursor-pointer text-center rounded-3xl  textgreen yellowbg font-bold py-4 px-2 "
        onClick={handleOpen}
      >
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
            <form onSubmit={(e) => e.preventDefault()}>
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
              <button
                type="button"
                className="paystack-btn"
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? "Loading..." : "Proceed to Payment"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DonateNow;
