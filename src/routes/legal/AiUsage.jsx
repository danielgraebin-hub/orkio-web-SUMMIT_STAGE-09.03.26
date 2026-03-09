import React from "react";
import { Link } from "react-router-dom";

export default function AiUsage() {
  return (
    <div className="min-h-screen bg-[#070910] text-white">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <Link to="/" className="text-sm text-white/50 hover:text-white/80">&larr; Back to home</Link>
        <h1 className="mt-6 text-3xl font-black tracking-tight">AI Usage Policy – Orkio</h1>

        <div className="mt-8 space-y-6 text-sm leading-7 text-white/75">
          <p>
            Orkio uses artificial intelligence to generate automated responses. Outputs may contain inaccuracies and should be evaluated critically.
            Orkio does not replace professional advice.
          </p>
        </div>
      </div>
    </div>
  );
}
