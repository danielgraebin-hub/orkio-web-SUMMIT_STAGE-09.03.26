import React from "react";
import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#070910] text-white">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <Link to="/" className="text-sm text-white/50 hover:text-white/80">&larr; Back to home</Link>
        <h1 className="mt-6 text-3xl font-black tracking-tight">Terms of Use – Orkio</h1>
        <p className="mt-2 text-sm text-white/50">Last updated: March 3, 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-7 text-white/75">
          <p>Orkio is a technology platform operated by <strong className="text-white/90">PATROAI CONSULTECH LTDA (CNPJ: 45.860.926/0001-95), Rua General João Manoel, 207, SLJ 2, Centro Histórico – Porto Alegre – RS – Brazil</strong>.</p>
          <p>By accessing or using Orkio, you agree to these Terms.</p>

          <ol className="list-decimal space-y-4 pl-5">
            <li>
              <strong className="text-white/90">Nature of the Platform</strong><br />
              Orkio provides AI-powered agents for informational and operational support. It does not replace professional advice of any kind.
            </li>
            <li>
              <strong className="text-white/90">Automated Processing</strong><br />
              Orkio operates through automated systems. No active human monitoring of chat content occurs. Chat content is not used for proprietary AI training.
            </li>
            <li>
              <strong className="text-white/90">User Responsibility</strong><br />
              Users are responsible for the information they input and the decisions they make based on generated responses.
            </li>
            <li>
              <strong className="text-white/90">Limitation of Liability</strong><br />
              Orkio does not guarantee specific outcomes and shall not be liable beyond applicable legal limits.
            </li>
            <li>
              <strong className="text-white/90">Intellectual Property</strong><br />
              All components of Orkio are protected by intellectual property laws.
            </li>
            <li>
              <strong className="text-white/90">Updates</strong><br />
              Terms may be updated and the latest version will be available within the platform.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
