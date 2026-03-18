# Setup Supabase - Guia Completo

## 📋 Passo a Passo

### 1. Criar Conta no Supabase
- Acesse: https://supabase.com
- Clique em "Sign Up"
- Use Google ou GitHub
- Crie um novo projeto

### 2. Criar Tabela no Banco

No dashboard do Supabase:
1. Vá para **SQL Editor**
2. Clique em **New Query**
3. Cole este código:

```sql
CREATE TABLE confirmations (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  status VARCHAR(50) DEFAULT 'confirmado',
  confirmed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_email ON confirmations(email);
```

4. Clique em **Run**

### 3. Pegar as Credenciais

No Supabase Dashboard:
1. Vá para **Settings** → **API**
2. Copie:
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon public** (chave pública)

### 4. Configurar Variáveis de Ambiente

Abra o arquivo `.env.local` e preencha:

```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_publica_aqui
```

### 5. Reiniciar o Servidor

```bash
npm run dev
```

## ✅ Testar

1. Acesse: http://localhost:3000
2. Clique em "Confirmar Presença"
3. Preencha o formulário
4. Clique em "Confirmar Presença"
5. Acesse: http://localhost:3000/admin
6. Você deve ver a confirmação na tabela

## 🔍 Verificar Dados no Supabase

1. No dashboard do Supabase
2. Vá para **Table Editor**
3. Clique em **confirmations**
4. Você verá todas as confirmações

## 📊 Estrutura da Tabela

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | BIGSERIAL | ID único (auto-incremento) |
| name | VARCHAR(255) | Nome do convidado |
| email | VARCHAR(255) | Email (único) |
| phone | VARCHAR(20) | Telefone (opcional) |
| status | VARCHAR(50) | Status (confirmado, cancelado, etc) |
| confirmed_at | TIMESTAMP | Data da confirmação |
| created_at | TIMESTAMP | Data de criação |

## 🚀 Próximos Passos

- [ ] Adicionar autenticação na página `/admin`
- [ ] Enviar email de confirmação
- [ ] Permitir cancelamento de presença
- [ ] Exportar dados em CSV

## ⚠️ Importante

- As variáveis em `.env.local` são públicas (NEXT_PUBLIC_)
- Isso é seguro porque o Supabase tem Row Level Security (RLS)
- Para produção, configure RLS no Supabase
- Nunca commite `.env.local` no Git

## 🆘 Troubleshooting

### Erro: "Cannot find module '@supabase/supabase-js'"
```bash
npm install @supabase/supabase-js
```

### Erro: "NEXT_PUBLIC_SUPABASE_URL is not defined"
- Verifique se `.env.local` está preenchido corretamente
- Reinicie o servidor: `npm run dev`

### Dados não aparecem em `/admin`
- Verifique se a tabela foi criada no Supabase
- Verifique as credenciais em `.env.local`
- Abra o console do navegador (F12) para ver erros
