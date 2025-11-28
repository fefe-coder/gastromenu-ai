// frontend/src/components/Layout.tsx
import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-root" style={{ minHeight: "100vh", background: "#0f172a" }}>
      {/* Top bar */}
      <header
        style={{
          borderBottom: "1px solid #1f2937",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#020617",
          position: "sticky",
          top: 0,
          zIndex: 20
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "white", fontWeight: 700, fontSize: 18 }}>
            GastroMenu AI
          </span>
          <span style={{ color: "#9ca3af", fontSize: 12 }}>
            AI-powered menu builder & digital menu
          </span>
        </div>

        <nav style={{ display: "flex", gap: 16, fontSize: 14 }}>
          <NavLink
            to="/dashboard"
            style={({ isActive }) => ({
              color: isActive ? "#38bdf8" : "#e5e7eb",
              textDecoration: "none",
              fontWeight: isActive ? 600 : 400
            })}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/manage"
            style={({ isActive }) => ({
              color: isActive ? "#38bdf8" : "#e5e7eb",
              textDecoration: "none",
              fontWeight: isActive ? 600 : 400
            })}
          >
            Manage Dishes
          </NavLink>
          <NavLink
            to="/menu"
            style={({ isActive }) => ({
              color: isActive ? "#38bdf8" : "#e5e7eb",
              textDecoration: "none",
              fontWeight: isActive ? 600 : 400
            })}
          >
            Public Menu
          </NavLink>
        </nav>
      </header>

      {/* Main content */}
      <main
        style={{
          padding: "20px",
          maxWidth: 1100,
          margin: "0 auto",
          color: "#e5e7eb"
        }}
      >
        {children}
      </main>

      <footer
        style={{
          padding: "12px 24px",
          borderTop: "1px solid #1f2937",
          marginTop: 32,
          fontSize: 12,
          color: "#6b7280",
          textAlign: "center"
        }}
      >
        GastroMenu AI · demo build
      </footer>
    </div>
  );
};

export default Layout;
