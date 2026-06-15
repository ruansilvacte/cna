import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import AIChatWidget from "./AIChatWidget";

const WHATSAPP_URL = "https://wa.me/19782357033?text=Hello%20CNA%20MAIDPRO%2C%20I%27d%20like%20a%20quote.";

export default function FloatingSocial() {
  return (
    <>
      <div className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-50 flex flex-col gap-2 md:gap-3">
        {/* Instagram */}
        <motion.a
          href="https://www.instagram.com/cnamaidpro/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          style={{
            background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
          aria-label="Instagram"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-7 md:h-7" fill="white">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </motion.a>

        {/* WhatsApp (using brand blue, not WhatsApp green) */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            style={{ background: "hsl(var(--cna-navy))" }}
            aria-label="Chat on WhatsApp"
          >
            <svg viewBox="0 0 32 32" className="w-6 h-6 md:w-7 md:h-7" fill="white" aria-hidden="true">
              <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 01-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 01-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.737.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.917 2.708.917.343 0 1.39-.276 1.39-.66 0-.43-.34-.802-.71-.802zM16.04 26.69c-1.86 0-3.715-.487-5.34-1.41l-3.84.99 1.03-3.76A10.69 10.69 0 015.34 16.06C5.34 10.16 10.14 5.36 16.04 5.36S26.74 10.16 26.74 16.06 21.94 26.69 16.04 26.69zM16.04 3.21C9 3.21 3.21 9.04 3.21 16.06c0 2.05.5 4.06 1.452 5.86L2.21 28.69l6.91-1.95a12.93 12.93 0 006.92 1.95c7.04 0 12.83-5.79 12.83-12.83S23.08 3.21 16.04 3.21z" />
            </svg>
          </a>
        </motion.div>
      </div>

      <AIChatWidget />
    </>
  );
}
