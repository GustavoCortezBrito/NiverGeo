"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ConfirmationModal from "./components/ConfirmationModal";

export default function Home() {
  const [confetti, setConfetti] = useState<Array<{id: number; x: number; delay: number; duration: number; color: string}>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const colors = ["#fda4af", "#fb7185", "#f472b6"];
    setConfetti(Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 15 + Math.random() * 70,
      delay: Math.random() * 2,
      duration: 4 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    })));
  }, []);

  const handleLocation = () => {
    window.open("https://www.google.com/maps?q=-22.2219202,-51.4386292&z=17&hl=pt-BR", "_blank");
  };

  const handleCalendar = () => {
    const startDate = "20260328T190000";
    const endDate = "20260328T230000";
    const title = "Aniversário de 20 anos da Geovanna";
    const details = "Venha comemorar comigo este dia especial!";
    const location = "Chacara Petrin, -22.2219202, -51.4386292";
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    
    window.open(googleCalendarUrl, "_blank");
  };

  const handleConfirm = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="relative w-screen min-h-screen bg-gradient-to-br from-[#fce7f3] via-[#fff5f7] to-[#fce7f3] flex items-center justify-center p-4 pb-8">
      <ConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Confetti sutil */}
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            top: "-5%",
          }}
          animate={{
            y: ["0vh", "110vh"],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <div className="text-center px-4 max-w-2xl w-full">
        {/* Conteúdo principal */}
        <div className="relative mb-0 min-h-[140px] sm:min-h-[180px] md:min-h-[220px] flex items-center justify-center">
          {/* Número 20 atrás */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-0"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 150, damping: 12 }}
          >
            <h1 className="text-[10rem] sm:text-[12rem] md:text-[16rem] font-bold opacity-50" style={{ fontFamily: "'Abril Fatface', serif", color: "#c93d6d" }}>
              20
            </h1>
          </motion.div>

          {/* Nome na frente */}
          <motion.h2
            className="relative z-10 text-6xl sm:text-7xl md:text-8xl text-gray-800 text-center"
            style={{ fontFamily: "'Allura', cursive" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Geovanna
          </motion.h2>
        </div>

        <motion.div
          className="flex justify-center items-center mb-4 mt-4"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <svg className="w-12 sm:w-16 h-4" viewBox="0 0 60 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 8 Q15 2, 30 8 T60 8" stroke="#dc7594" strokeWidth="1.5" fill="none"/>
          </svg>
          <span className="mx-3 text-xl sm:text-2xl text-[#c93d6d]">♥</span>
          <svg className="w-12 sm:w-16 h-4" viewBox="0 0 60 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 8 Q15 14, 30 8 T60 8" stroke="#dc7594" strokeWidth="1.5" fill="none"/>
          </svg>
        </motion.div>

        <motion.div
          className="space-y-4 sm:space-y-5 mb-8 sm:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-base sm:text-lg font-semibold text-gray-700" style={{ fontFamily: "Montserrat" }}>
            VENHA COMEMORAR COMIGO<br />ESTE DIA ESPECIAL
          </p>
          
          <div className="bg-gradient-to-r from-[#c93d6d] via-[#dc7594] to-[#c93d6d] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full inline-block text-xl sm:text-2xl font-bold shadow-lg">
            28 DE MARÇO
          </div>
          
          <p className="text-base sm:text-lg font-semibold text-gray-800" style={{ fontFamily: "Montserrat" }}>
            ÀS 19:30 HORAS
          </p>
          
          <motion.div
            className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl px-6 sm:px-8 py-4 sm:py-5 shadow-lg border-2 border-[#dc7594] border-opacity-30 mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">📍</span>
              <p className="text-sm sm:text-base font-bold text-[#c93d6d]" style={{ fontFamily: "Montserrat" }}>
                LOCAL DO EVENTO
              </p>
            </div>
            <p className="text-sm sm:text-base text-gray-800 font-semibold" style={{ fontFamily: "Montserrat" }}>
              CHACARA PETRIN<br />
              <span className="text-xs sm:text-sm text-gray-600">Pra baixo do Rancho Quarto de Milha</span>
            </p>
          </motion.div>
        </motion.div>

        {/* Ícones de ação */}
        <div className="w-full mt-8 sm:mt-12 pb-8">
          <motion.div
            className="flex justify-center items-center gap-8 sm:gap-12 md:gap-16 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            {/* Localização */}
            <motion.button
              className="flex flex-col items-center w-24 sm:w-28 cursor-pointer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.15, y: -8 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLocation}
            >
              <div className="relative mb-2">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-dashed border-[#dc7594] flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-3 border-[#c93d6d] bg-white flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#c93d6d]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                </div>
                <div className="absolute -top-1 -left-1 text-lg">🌸</div>
              </div>
              <p className="text-[10px] sm:text-xs font-bold text-[#c93d6d] uppercase text-center leading-tight" style={{ fontFamily: "Montserrat" }}>
                Local da<br />Festa
              </p>
            </motion.button>

            {/* Confirmar Presença */}
            <motion.button
              className="flex flex-col items-center w-24 sm:w-28 cursor-pointer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.7, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.15, y: -8 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleConfirm}
            >
              <div className="relative mb-2">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-dashed border-[#dc7594] flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-3 border-[#c93d6d] bg-white flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#c93d6d]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 text-lg">🌸</div>
              </div>
              <p className="text-[10px] sm:text-xs font-bold text-[#c93d6d] uppercase text-center leading-tight" style={{ fontFamily: "Montserrat" }}>
                Confirmar<br />Presença
              </p>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
