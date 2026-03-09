PATCH0216B — Proxy Hardening

Inclui:
- remoção explícita de headers hop-by-hop/sensíveis no proxy /api/*
  host, connection, transfer-encoding, content-length, content-encoding, origin
- Cache-Control: no-cache no caminho do proxy
- flushHeaders() quando disponível para ajudar SSE

Variáveis:
API_BASE_URL=https://SUA_API.up.railway.app
USE_API_PROXY=true
