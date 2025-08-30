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
