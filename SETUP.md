# Configuração - Sistema de Confirmação de Presença

## O que foi implementado

### 1. **Modal de Confirmação de Presença**
- Formulário para coletar: Nome, Email e Telefone
- Integração com Google Calendar e Apple Calendar
- Salva os dados automaticamente

### 2. **API Backend**
- Endpoint: `POST /api/confirmations`
- Salva as confirmações em arquivo JSON (`data/confirmations.json`)
- Endpoint: `GET /api/confirmations` - Lista todas as confirmações

### 3. **Página de Admin**
- Acesse em: `http://localhost:3000/admin`
- Visualize todas as confirmações em uma tabela
- Mostra: Nome, Email, Telefone, Status e Data

## Como usar

### Desenvolvimento
```bash
npm run dev
```

Acesse:
- **Página principal**: http://localhost:3000
- **Admin**: http://localhost:3000/admin

### Fluxo do usuário
1. Clique no botão "Confirmar Presença"
2. Preencha o formulário (Nome e Email obrigatórios)
3. Clique em "Confirmar Presença"
4. Escolha adicionar à agenda (Google ou Apple)
5. Pronto! Sua presença foi confirmada

## Estrutura de arquivos criados

```
app/
├── api/
│   └── confirmations/
│       └── route.ts          # API para salvar/listar confirmações
├── components/
│   └── ConfirmationModal.tsx # Modal de confirmação
├── admin/
│   └── page.tsx              # Página de admin
└── page.tsx                  # Página principal (atualizada)

data/
└── confirmations.json        # Arquivo com as confirmações (criado automaticamente)
```

## Próximos passos (Opcional)

### Para usar banco de dados real (recomendado para produção):
1. **MongoDB**: Instale `mongodb` e `mongoose`
2. **Supabase**: Use PostgreSQL com Supabase
3. **Firebase**: Use Firestore

### Para enviar emails de confirmação:
1. Instale `nodemailer` ou `resend`
2. Adicione lógica no endpoint POST

### Para melhorar segurança:
1. Adicione autenticação na página de admin
2. Valide emails antes de salvar
3. Implemente rate limiting

## Notas importantes

- As confirmações são salvas em arquivo JSON no servidor
- Para produção, recomenda-se usar um banco de dados real
- O arquivo `data/confirmations.json` é criado automaticamente
- Adicione `data/` ao `.gitignore` se quiser (já está configurado)
