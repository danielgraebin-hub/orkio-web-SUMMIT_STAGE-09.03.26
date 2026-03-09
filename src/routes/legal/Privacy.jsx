import React from "react";
import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#070910] text-white">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <Link to="/" className="text-sm text-white/50 hover:text-white/80">&larr; Back to home</Link>
        <h1 className="mt-6 text-3xl font-black tracking-tight">Privacy Policy – Orkio</h1>
        <p className="mt-2 text-sm text-white/50">Last updated: March 3, 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-7 text-white/75">
          <p>Orkio processes personal data in compliance with applicable data protection laws.</p>

          <p>Data collected may include name, email, WhatsApp (if provided), and information submitted voluntarily.</p>

          <p>Data is processed for:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Platform operation</li>
            <li>User authentication</li>
            <li>Support</li>
            <li>Legal compliance</li>
          </ul>

          <p>Marketing communications occur only with explicit consent.</p>

          <p>
            Users may request access, correction, deletion, or withdrawal of consent through the official contact form.
            Requests may be answered within 15 days.
          </p>

          <p className="text-white/60">
            Data controller: <strong className="text-white/80">PATROAI CONSULTECH LTDA (CNPJ: 45.860.926/0001-95), Rua General João Manoel, 207, SLJ 2, Centro Histórico – Porto Alegre – RS – Brazil</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
