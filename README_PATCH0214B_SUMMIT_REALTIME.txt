PATCH0214B — WEB SUMMIT REALTIME

Inclui:
- proxy same-origin /api/* no server.cjs
- register com access_code + accept_terms no AuthPage.jsx
- botão "Baixar ata" no painel Realtime
- correção de recursão acidental em finalizeRealtimeSession()

ENV no Railway (WEB):
- API_BASE_URL=https://SUA_API.up.railway.app
- USE_API_PROXY=true
- não definir VITE_API_BASE_URL quando usar proxy

Checklist:
1) GET /health -> 200
2) GET /api/health via web -> 200
3) register envia access_code + accept_terms
4) sessão realtime grava eventos
5) botão baixar ata chama /api/realtime/sessions/{id}/ata.txt