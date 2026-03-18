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
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [confirmations, setConfirmations] = useState<Confirmation[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const res = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setAuthenticated(true);
        fetchConfirmations();
      } else {
        setAuthError('Senha incorreta');
      }
    } catch {
      setAuthError('Erro ao autenticar');
    } finally {
      setAuthLoading(false);
    }
  };

  const fetchConfirmations = async () => {
    setLoading(true);
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

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fce7f3] via-[#fff5f7] to-[#fce7f3] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <span className="text-4xl">🔒</span>
            <h1 className="text-2xl font-bold text-[#c93d6d] mt-2">Área Restrita</h1>
            <p className="text-gray-500 text-sm mt-1">Digite a senha para acessar</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              required
              className="w-full px-4 py-3 border-2 border-[#dc7594] rounded-lg focus:outline-none focus:border-[#c93d6d] text-gray-800"
            />

            {authError && (
              <p className="text-red-500 text-sm text-center">{authError}</p>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-gradient-to-r from-[#c93d6d] to-[#dc7594] text-white font-bold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50"
            >
              {authLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fce7f3] via-[#fff5f7] to-[#fce7f3] p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-[#c93d6d]">
            Confirmações de Presença
          </h1>
          <button
            onClick={() => setAuthenticated(false)}
            className="text-sm text-gray-500 hover:text-[#c93d6d] transition font-semibold"
          >
            Sair
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-[#c93d6d] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : confirmations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-500">
            Nenhuma confirmação ainda
          </div>
        ) : (
          <>
            <div className="bg-white rounded-2xl shadow p-4 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#fce7f3] flex items-center justify-center text-[#c93d6d] font-bold text-lg">
                {confirmations.length}
              </div>
              <p className="text-gray-700 font-semibold">
                {confirmations.length === 1 ? 'confirmação recebida' : 'confirmações recebidas'}
              </p>
            </div>

            {/* Cards mobile */}
            <div className="flex flex-col gap-4 sm:hidden">
              {confirmations.map((c) => (
                <div key={c.id} className="bg-white rounded-2xl shadow p-4 border-l-4 border-[#c93d6d]">
                  <p className="font-bold text-gray-800 text-base mb-1">{c.name}</p>
                  <p className="text-sm text-gray-500 mb-1">{c.email}</p>
                  <p className="text-sm text-gray-500 mb-2">{c.phone || 'Sem telefone'}</p>
                  <div className="flex items-center justify-between">
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {c.status}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(c.confirmed_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabela desktop */}
            <div className="hidden sm:block bg-white rounded-2xl shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#fce7f3]">
                  <tr>
                    <th className="text-left py-4 px-6 font-bold text-[#c93d6d]">Nome</th>
                    <th className="text-left py-4 px-6 font-bold text-[#c93d6d]">Email</th>
                    <th className="text-left py-4 px-6 font-bold text-[#c93d6d]">Telefone</th>
                    <th className="text-left py-4 px-6 font-bold text-[#c93d6d]">Status</th>
                    <th className="text-left py-4 px-6 font-bold text-[#c93d6d]">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {confirmations.map((c, i) => (
                    <tr
                      key={c.id}
                      className={`border-t border-gray-100 hover:bg-[#fff5f7] transition ${i % 2 === 0 ? '' : 'bg-gray-50'}`}
                    >
                      <td className="py-4 px-6 font-semibold text-gray-800">{c.name}</td>
                      <td className="py-4 px-6 text-gray-600">{c.email}</td>
                      <td className="py-4 px-6 text-gray-600">{c.phone || '-'}</td>
                      <td className="py-4 px-6">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {c.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-500 text-sm">
                        {new Date(c.confirmed_at).toLocaleDateString('pt-BR')}
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
  );
}
