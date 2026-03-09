import React, { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiFetch } from "../ui/api.js";
import Footer from "../ui/Footer.jsx";

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";

function qp() {
  const p = new URLSearchParams(window.location.search);
  const out = {};
  for (const [k,v] of p.entries()) out[k]=v;
  return out;
}

export default function Signup() {
  const nav = useNavigate();
  const q = useMemo(() => qp(), []);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    segment: q.segment || "enterprise",
    access_code: q.code || "",
    consent_terms: false,
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef(null);

  // Load Turnstile script
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    if (document.getElementById("cf-turnstile-script")) return;
    const s = document.createElement("script");
    s.id = "cf-turnstile-script";
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
    s.async = true;
    window.onTurnstileLoad = () => {
      if (turnstileRef.current && window.turnstile) {
        window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token) => setTurnstileToken(token),
          "error-callback": () => setTurnstileToken(""),
          "expired-callback": () => setTurnstileToken(""),
          theme: "dark",
        });
      }
    };
    document.head.appendChild(s);
  }, []);

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e){
    e.preventDefault();
    setErr("");
    if (!form.consent_terms) {
      setErr("You must accept the Terms of Use and Privacy Policy.");
      return;
    }
    setLoading(true);
    try{
      const body = {
        name: form.name,
        email: form.email,
        company: form.company,
        role: form.role,
        segment: form.segment,
        source: "qr",
      };
      if (form.access_code) body.access_code = form.access_code;
      if (turnstileToken) body.turnstile_token = turnstileToken;
      body.consent_terms = form.consent_terms;

      const r = await apiFetch("/api/leads", {
        method: "POST",
        body: body,
      });
      if(!r?.ok) throw new Error("lead_failed");
      localStorage.setItem("orkio_lead", JSON.stringify({
        lead_id: r.lead_id,
        name: form.name,
        email: form.email,
        company: form.company,
        role: form.role,
        segment: form.segment
      }));
      nav("/?autochat=1");
    }catch(_e){
      setErr(_e.message || "Registration failed. Please try again.");
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#070910] text-white flex flex-col">
      <div className="flex-1 mx-auto max-w-xl px-4 py-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(52,211,153,0.15)]" />
          Confidential &bull; International Version
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <h1 className="text-2xl font-extrabold tracking-tight">Join Orkio</h1>
          <p className="mt-2 text-white/70">
            Takes 20 seconds. Then you talk to <b>Orkio &mdash; the CEO of CEOs</b>.
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="text-xs text-white/70">Name</label>
              <input className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-white/20"
                     required value={form.name} onChange={onChange("name")} placeholder="Your name"/>
            </div>
            <div>
              <label className="text-xs text-white/70">Email</label>
              <input className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-white/20"
                     required type="email" value={form.email} onChange={onChange("email")} placeholder="you@company.com"/>
            </div>
            <div>
              <label className="text-xs text-white/70">Company</label>
              <input className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-white/20"
                     required value={form.company} onChange={onChange("company")} placeholder="Your company"/>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs text-white/70">Role</label>
                <input className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-white/20"
                       value={form.role} onChange={onChange("role")} placeholder="CEO, CTO, Head..."/>
              </div>
              <div>
                <label className="text-xs text-white/70">Segment</label>
                <select className="mt-1 w-full rounded-xl border border-white/10 bg-[#0b1020] px-3 py-2 outline-none focus:border-white/20"
                        value={form.segment} onChange={onChange("segment")}>
                  <option value="enterprise">Enterprise</option>
                  <option value="fintech">Fintech</option>
                  <option value="legal">Legal</option>
                  <option value="support">Support</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Access Code (Summit Mode) */}
            <div>
              <label className="text-xs text-white/70">Access Code <span className="text-white/40">(if you have one)</span></label>
              <input className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-white/20 font-mono"
                     value={form.access_code} onChange={onChange("access_code")} placeholder="XXXX-XXXX"/>
            </div>

            {/* Turnstile Widget */}
            {TURNSTILE_SITE_KEY && (
              <div ref={turnstileRef} className="mt-2" />
            )}

            {/* Terms Acceptance */}
            <label className="flex items-start gap-3 cursor-pointer pt-2">
              <input
                type="checkbox" checked={form.consent_terms}
                onChange={(e) => setForm({ ...form, consent_terms: e.target.checked })}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 accent-violet-500"
              />
              <span className="text-xs text-white/60">
                I have read and agree to the{" "}
                <Link to="/legal/terms" className="text-violet-400 hover:underline" target="_blank">Terms of Use</Link>{" "}
                and{" "}
                <Link to="/legal/privacy" className="text-violet-400 hover:underline" target="_blank">Privacy Policy</Link>. *
              </span>
            </label>

            {err ? <div className="rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-sm text-red-200">{err}</div> : null}

            <button disabled={loading || (TURNSTILE_SITE_KEY && !turnstileToken)}
                    className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-emerald-400 px-4 py-2.5 font-extrabold text-black shadow-[0_16px_30px_rgba(124,92,255,0.2)] disabled:opacity-60">
              {loading ? "Sending..." : "Join and talk to Orkio \u2192"}
            </button>

            <button type="button" onClick={() => nav("/")}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-semibold text-white/90 hover:bg-white/10">
              Back
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
