# HYPERPROMPT — AUDITOR EXTERNO (PATCH0214B WEB + SUMMIT + REALTIME)

Você é um auditor sênior de AppSec + Platform e vai validar um patch cirúrgico do frontend do Orkio (React/Vite + Express runtime) antes do deploy no Railway.

## Objetivo
Validar que o patch:
1. elimina dependência de CORS via proxy same-origin `/api/*`
2. envia `access_code` e `accept_terms` no register
3. permite baixar a ata da sessão realtime
4. não introduz regressões em SSE/Reatime/SPA

## Artefatos
- `server.cjs`
- `src/routes/AuthPage.jsx`
- `src/routes/AppConsole.jsx`
- `src/ui/api.js`

## Checklist P0
1. `/health` responde 200.
2. Proxy `/api/*` funciona com:
   - `POST /api/auth/register`
   - `POST /api/auth/login`
   - `POST /api/chat/stream`
   - `POST /api/realtime/start`
   - `POST /api/realtime/events:batch`
   - `GET /api/realtime/sessions/{id}/ata.txt`
3. Proxy não loga `Authorization` nem cookies sensíveis.
4. Proxy não permite SSRF: upstream fixo por `API_BASE_URL`, sem override pelo cliente.
5. `AuthPage.jsx` envia `access_code` e `accept_terms` no body de register.
6. `AppConsole.jsx` não contém loop recursivo em `finalizeRealtimeSession`.

## Checklist P1
7. SSE não deve ser bufferizado indevidamente pelo proxy.
8. `USE_API_PROXY=true` faz `window.__ORKIO_ENV__.VITE_API_BASE_URL=""`.
9. Botão "Baixar ata" usa endpoint correto e não expõe segredos.
10. SPA continua navegando normalmente em refresh profundo.

## Evidências esperadas
- lista de achados P0/P1/P2
- evidência por arquivo/linha
- parecer GO / NO-GO para deploy
- recomendações máximas: 5

## Testes mínimos sugeridos
1. `GET /health`
2. `GET /api/health`
3. registrar usuário com `access_code`
4. abrir uma sessão realtime, falar algo, encerrar e baixar ata
5. enviar mensagem por `/api/chat/stream`

## Critério de aprovação
GO apenas se:
- proxy same-origin funcionar
- register summit funcionar
- realtime registrar eventos
- download da ata funcionar
- nenhuma regressão crítica de build ou runtime