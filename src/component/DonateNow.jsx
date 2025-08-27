// src/components/DonateNow.jsx
import React, { useState, useEffect } from "react";
import "../css/DonateNow.css";
import { saveDonation } from "../lib/firebase/firebase";

const DonateNow = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", amount: "" });
  const [loading, setLoading] = useState(false);

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  useEffect(() => {
    if (!document.getElementById("paystack-script")) {
      const script = document.createElement("script");
      script.id = "paystack-script";
      script.src = "https://js.paystack.co/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = () => {
    const { name, email, amount } = formData;
    if (!name || !email || !amount) {
      alert("Please fill all fields");
      return;
    }

    if (!publicKey || !window.PaystackPop) {
      alert("Paystack is not ready. Check your setup.");
      return;
    }

    setLoading(true);

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email,
      amount: parseInt(amount, 10) * 100,
      currency: "NGN",
      ref: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      onClose: () => {
        alert("Payment window closed");
        setLoading(false);
      },
      callback: (response) => {
        alert(`🎉 Success! Payment ${response.reference} was successful.`);
        saveDonation({
          name,
          email,
          amount: parseInt(amount, 10),
          reference: response.reference,
          status: "completed",
        });
        setShowModal(false);
        setFormData({ name: "", email: "", amount: "" });
        setLoading(false);
      },
    });

    handler.openIframe();
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        className="w-full cursor-pointer text-center rounded-3xl textgreen yellowbg font-bold py-4 px-2"
        onClick={() => setShowModal(true)}
      >
        Donate Now
      </button>

      {/* Modal */}
      {showModal && (
        <Modal
          formData={formData}
          handleInputChange={handleInputChange}
          handlePayment={handlePayment}
          loading={loading}
          handleClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

// Reusable Modal Component
const Modal = ({
  formData,
  handleInputChange,
  handlePayment,
  loading,
  handleClose,
}) => {
  return (
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
  );
};

export default DonateNow;
