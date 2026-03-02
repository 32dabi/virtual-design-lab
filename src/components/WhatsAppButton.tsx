import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/5586999999999?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20pain%C3%A9is%20ELEVARE."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 hover:scale-110 transition-all duration-300"
      aria-label="WhatsApp"
    >
      <MessageCircle className="text-white" size={26} />
    </a>
  );
};

export default WhatsAppButton;
