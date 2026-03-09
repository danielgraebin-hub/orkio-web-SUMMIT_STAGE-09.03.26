import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./ui/Layout.jsx";

import Landing from "./routes/Landing.jsx";
import AuthPage from "./routes/AuthPage.jsx";
import Signup from "./routes/Signup.jsx";
import AppConsole from "./routes/AppConsole.jsx";
import AdminConsole from "./routes/AdminConsole.jsx";
import Contact from "./routes/Contact.jsx";
import PrivacySettings from "./routes/PrivacySettings.jsx";
import Terms from "./routes/legal/Terms.jsx";
import Privacy from "./routes/legal/Privacy.jsx";
import Cookies from "./routes/legal/Cookies.jsx";
import AiUsage from "./routes/legal/AiUsage.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/app" element={<AppConsole />} />
          <Route path="/admin" element={<AdminConsole />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/settings/privacy" element={<PrivacySettings />} />
          <Route path="/legal/terms" element={<Terms />} />
          <Route path="/legal/privacy" element={<Privacy />} />
          <Route path="/legal/cookies" element={<Cookies />} />
          <Route path="/legal/ai" element={<AiUsage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
