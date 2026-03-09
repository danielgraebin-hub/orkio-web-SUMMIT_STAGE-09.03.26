import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../ui/api.js";
import { setSession, getTenant } from "../lib/auth.js";

export default function AuthPage() {
  const nav = useNavigate();
  const [tab, setTab] = useState("login");
  const [tenant, setTenant] = useState(getTenant());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [otpMode, setOtpMode] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  async function doLogin() {
    setStatus("Signing in...");
    try {
      const { data } = await apiFetch("/api/auth/login", {
        method: "POST",
        org: tenant,
        body: { tenant, email, password },
      });
      if (data?.pending_otp) {
        setOtpMode(true);
        setPendingEmail(data.email || email);
        setStatus(data.message || "Enter the code sent to your email.");
        return;
      }
      if (data.user?.role === "admin" || data.user?.approved_at) {
        setSession({ token: data.access_token, user: data.user, tenant });
        nav(data.user?.role === "admin" ? "/admin" : "/app");
      } else {
        setStatus("Account created. Awaiting admin approval to grant access.");
        setTab("login");
      }
    } catch (e) {
      if ((e.message || "").toLowerCase().includes("pending approval")) {
        setStatus("Your account is still pending admin approval.");
      } else {
        setStatus(e.message || "Login failed");
      }
    }
  }

async function doVerifyOtp() {
  setStatus("Verifying code...");
  try {
    const { data } = await apiFetch("/api/auth/login/verify-otp", {
      method: "POST",
      org: tenant,
      body: { tenant, email: pendingEmail || email, code: otpCode },
    });
    setSession({ token: data.access_token, user: data.user, tenant });
    nav(data.user?.role === "admin" ? "/admin" : "/app");
  } catch (e) {
    setStatus(e.message || "Invalid code");
  }
}

  async function doRegister() {
    setStatus("Criando conta...");
    try {
      const { data } = await apiFetch("/api/auth/register", {
        method: "POST",
        org: tenant,
        body: { tenant, email, name, password, access_code: accessCode, accept_terms: acceptTerms },
      });
      if (data.user?.role === "admin" || data.user?.approved_at) {
        setSession({ token: data.access_token, user: data.user, tenant });
        nav(data.user?.role === "admin" ? "/admin" : "/app");
      } else {
        setStatus("Account created. Awaiting admin approval to grant access.");
        setTab("login");
      }
    } catch (e) {
      setStatus(e.message || "Falha no registro");
    }
  }

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", padding: 16, fontFamily: "system-ui", background: "#fff", borderRadius: 16 }}>
      <h2 style={{ marginBottom: 4 }}>Acesso</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button disabled={otpMode} onClick={() => setTab("login")} style={tabBtn(tab === "login")}>Login</button>
        <button disabled={otpMode} onClick={() => setTab("register")} style={tabBtn(tab === "register")}>Registrar</button>
      </div>

      <label style={lbl}>Tenant</label>
      <input style={inp} value={tenant} onChange={(e) => setTenant(e.target.value)} placeholder="public" />

      {tab === "register" ? (
        <>
          <label style={lbl}>Nome</label>
          <input style={inp} value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" />
        </>
      ) : null}

      <label style={lbl}>Email</label>
      <input style={inp} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@dominio.com" />

      <label style={lbl}>Senha</label>
      <input style={inp} value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" />


      {tab === "register" ? (
        <>
          <label style={lbl}>Código do evento</label>
          <input style={inp} value={accessCode} onChange={(e) => setAccessCode(e.target.value)} placeholder="Digite seu código" />
          <label style={{ ...lbl, display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
            <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
            <span>Aceito os termos de uso e privacidade</span>
          </label>
        </>
      ) : null}

      {otpMode ? (
        <>
          <label style={lbl}>Código (6 dígitos)</label>
          <input style={inp} value={otpCode} onChange={(e) => setOtpCode(e.target.value)} placeholder="000000" />
        </>
      ) : null}

      <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
        {tab === "login" ? (
          otpMode ? (
            <>
              <button style={btnPrimary} onClick={doVerifyOtp}>Verificar código</button>
              <button style={btnSecondary} onClick={doLogin}>Reenviar código</button>
              <button style={btnSecondary} onClick={() => { setOtpMode(false); setOtpCode(""); setPendingEmail(""); setStatus(""); }}>Voltar</button>
            </>
          ) : (
            <button style={btnPrimary} onClick={doLogin}>Entrar</button>
          )
        ) : (
          <button style={btnPrimary} onClick={doRegister}>Criar conta</button>
        )}
        <button style={btnSecondary} onClick={() => nav("/")}>Voltar</button>
      </div>

      {status ? <p style={{ marginTop: 14, color: "#444" }}>{status}</p> : null}
    </div>
  );
}

const lbl = { display: "block", marginTop: 12, marginBottom: 6, color: "#333" };
const inp = { width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd", background: "#fff", color: "#111" };
const btnPrimary = { background: "#111", color: "#fff", padding: "10px 14px", borderRadius: 10, border: "none", cursor: "pointer" };
const btnSecondary = { background: "#f3f3f3", color: "#111", padding: "10px 14px", borderRadius: 10, border: "1px solid #ddd", cursor: "pointer" };
const tabBtn = (active) => ({
  padding: "8px 12px",
  borderRadius: 10,
  border: "1px solid " + (active ? "#111" : "#ddd"),
  background: active ? "#111" : "#fff",
  color: active ? "#fff" : "#111",
  cursor: "pointer",
});