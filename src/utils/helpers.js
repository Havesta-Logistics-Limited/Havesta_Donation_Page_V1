const createWhatsAppUrl = (number, message) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedMessage}`;
};

export const handleShare = () => {
  const message = `Havesta is currently crowdfunding to bring our MVP to life .

With your support, we can create a digital product that connects farmers directly to customers—making Fresh Farm Produce, Healthy Livestock, and other Agri-Inputs accessible to all while transforming agriculture in Nigeria.

This initiative has huge growth potential and we're inviting you to be part of the early supporters who will make this vision possible. Every donation makes a difference.

Please Donate today & help share this with your friends!

Check it out here: https://havesta.com/donation`;

  const whatsappUrl = createWhatsAppUrl("", message);
  window.open(whatsappUrl, "_blank");
};

export const getTimeAgo = (timestamp) => {
  const now = new Date();
  const donationTime = timestamp.toDate
    ? timestamp.toDate()
    : new Date(timestamp);
  const diffTime = Math.abs(now - donationTime);

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffTime / (1000 * 60));

  if (diffDays > 0) return `${diffDays} d`;
  if (diffHours > 0) return `${diffHours} hrs`;
  if (diffMinutes > 0) return `${diffMinutes} min`;
  return "just now";
};

export const formatCurrency = (amount) => `₦${amount.toLocaleString()}`;
