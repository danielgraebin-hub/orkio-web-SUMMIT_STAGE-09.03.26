import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";

/**
 * Global layout wrapper to ensure legal footer is present on all pages.
 */
export default function Layout() {
  return (
    <div className="min-h-screen bg-[#070910] text-white flex flex-col">
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
