'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ConfirmationModalFamiliaProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfirmationModalFamilia({ isOpen, onClose }: ConfirmationModalFamiliaProps) {
  const [formData, setFormData] = useState({ name: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addToCalendar = (type: 'google' | 'apple') => {
    const startDate = '20260328T113000';
    const endDate = '20260328T153000';
    const title = 'Aniversário de 20 anos da Geovanna - Almoço em Família';
    const details = `Confirmado por: ${formData.name}`;
    const location = 'Chacara Lines, Kilometro 486,5';

    if (type === 'google') {
      const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
      window.open(url, '_blank');
    } else if (type === 'apple') {
      const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Apple Inc.//Mac OS X 10.15.7//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
DTSTART:20260328T113000Z
DTEND:20260328T153000Z
SUMMARY:${title}
DESCRIPTION:${details}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`;
      
      const blob = new Blob([icsContent], { type: 'text/calendar' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'aniversario-geovanna-familia.ics';
      link.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/confirmations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: `familia-${Date.now()}@niver.local`,
          phone: null,
          status: 'confirmado-familia',
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao confirmar presença');
      }

      setSuccess(true);
      setFormData({ name: '' });
      
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {success ? (
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-5xl mb-4">✨</div>
                <h3 className="text-2xl font-bold text-[#c93d6d] mb-2">
                  Presença Confirmada!
                </h3>
                <p className="text-gray-600">
                  Obrigada por confirmar sua presença, {formData.name}!
                </p>
              </motion.div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-[#c93d6d] mb-6 text-center">
                  Confirmar Presença
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nome *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border-2 border-[#dc7594] rounded-lg focus:outline-none focus:border-[#c93d6d]"
                      placeholder="Seu nome"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#c93d6d] to-[#dc7594] text-white font-bold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50"
                  >
                    {loading ? 'Confirmando...' : 'Confirmar Presença'}
                  </button>
                </form>

                <div className="border-t-2 border-gray-200 pt-6">
                  <p className="text-sm font-semibold text-gray-700 mb-3 text-center">
                    Adicionar à agenda:
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => addToCalendar('google')}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition"
                    >
                      Google Calendar
                    </button>
                    <button
                      onClick={() => addToCalendar('apple')}
                      className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 rounded-lg transition"
                    >
                      Apple Calendar
                    </button>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full mt-4 text-gray-600 hover:text-gray-800 font-semibold py-2"
                >
                  Fechar
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
