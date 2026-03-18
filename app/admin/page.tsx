'use client';

import { useEffect, useState } from 'react';

interface Confirmation {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  status: string;
  confirmed_at: string;
}

export default function AdminPage() {
  const [confirmations, setConfirmations] = useState<Confirmation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfirmations();
  }, []);

  const fetchConfirmations = async () => {
    try {
      const response = await fetch('/api/confirmations');
      const data = await response.json();
      setConfirmations(data);
    } catch (error) {
      console.error('Erro ao buscar confirmações:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fce7f3] via-[#fff5f7] to-[#fce7f3] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#c93d6d] mb-8">
          Confirmações de Presença
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {loading ? (
            <p className="text-center text-gray-600">Carregando...</p>
          ) : confirmations.length === 0 ? (
            <p className="text-center text-gray-600">Nenhuma confirmação ainda</p>
          ) : (
            <>
              <div className="mb-6 p-4 bg-[#fce7f3] rounded-lg">
                <p className="text-lg font-bold text-[#c93d6d]">
                  Total de confirmações: {confirmations.length}
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-[#dc7594]">
                      <th className="text-left py-3 px-4 font-bold text-[#c93d6d]">Nome</th>
                      <th className="text-left py-3 px-4 font-bold text-[#c93d6d]">Email</th>
                      <th className="text-left py-3 px-4 font-bold text-[#c93d6d]">Telefone</th>
                      <th className="text-left py-3 px-4 font-bold text-[#c93d6d]">Status</th>
                      <th className="text-left py-3 px-4 font-bold text-[#c93d6d]">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {confirmations.map((confirmation) => (
                      <tr
                        key={confirmation.id}
                        className="border-b border-gray-200 hover:bg-[#fce7f3] transition"
                      >
                        <td className="py-3 px-4 text-gray-800">{confirmation.name}</td>
                        <td className="py-3 px-4 text-gray-800">{confirmation.email}</td>
                        <td className="py-3 px-4 text-gray-800">{confirmation.phone || '-'}</td>
                        <td className="py-3 px-4">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                            {confirmation.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-sm">
                          {new Date(confirmation.confirmed_at).toLocaleDateString('pt-BR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
