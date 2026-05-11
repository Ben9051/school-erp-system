import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

  // 🔐 TEMP USER (later from backend)
  const user = {
    name: "Ben",
    role: "Librarian",
  };

  const schoolName = "My School"; // later from DB

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleTheme = () => setDarkMode(!darkMode);

  const handleLogout = () => {
    // later: clear token/session
    navigate("/");
  };

  return (
    <div
      style={{
        ...styles.container,
        background: darkMode ? "#0f172a" : "#f1f5f9",
        color: darkMode ? "white" : "black",
      }}
    >
      {/* ================= HEADER ================= */}
      <header style={styles.header}>
        {/* Left */}
        <button onClick={toggleSidebar} style={styles.hamburger}>
          ☰
        </button>

        {/* Center */}
        <div style={styles.schoolName}>{schoolName}</div>

        {/* Right */}
        <div style={styles.rightSection}>
          <span style={{ marginRight: 15 }}>🔔</span>

          <button onClick={toggleTheme} style={styles.themeBtn}>
            {darkMode ? "🌙" : "☀️"}
          </button>

          <span
            style={styles.profile}
            onClick={() => navigate("/librarian/profile")}
          >
            👤 {user.name}
          </span>
        </div>
      </header>

      {/* ================= BODY ================= */}
      <div style={styles.body}>
        {/* SIDEBAR */}
        <aside
          style={{
            ...styles.sidebar,
            width: sidebarOpen ? "220px" : "70px",
          }}
        >
          <nav>
            <Link to="/librarian" style={styles.link}>Overview</Link>
            <Link to="/librarian/books" style={styles.link}>Books</Link>
            <Link to="/librarian/reports" style={styles.link}>Reports</Link>
            <Link to="/librarian/past-papers" style={styles.link}>Past Papers</Link>
            <Link to="/librarian/profile" style={styles.link}>Profile</Link>
          </nav>

          {/* Logout at bottom */}
          <div style={styles.logoutContainer}>
            <button onClick={handleLogout} style={styles.logout}>
              Logout
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main style={styles.main}>
          <h2>
            Welcome, {user.name} 👋
          </h2>

          {/* Dynamic Pages Render Here */}
          <Outlet />
        </main>
      </div>

      {/* ================= FOOTER ================= */}
      <footer style={styles.footer}>
        © {new Date().getFullYear()} {schoolName} - All rights reserved
      </footer>
    </div>
  );
};

export default DashboardLayout;

/* ================= STYLES ================= */

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },

  header: {
    height: "60px",
    background: "#1e293b",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 15px",
  },

  hamburger: {
    fontSize: "20px",
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
  },

  schoolName: {
    fontSize: "18px",
    fontWeight: "bold",
  },

  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  themeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
  },

  profile: {
    cursor: "pointer",
    fontSize: "14px",
  },

  body: {
    flex: 1,
    display: "flex",
  },

  sidebar: {
    background: "#0f172a",
    color: "white",
    transition: "0.3s",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  link: {
    display: "block",
    color: "white",
    textDecoration: "none",
    padding: "10px 0",
  },

  logoutContainer: {
    marginTop: "auto",
  },

  main: {
    flex: 1,
    padding: "20px",
  },

  footer: {
    height: "40px",
    background: "#e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  logout: {
    width: "100%",
    background: "red",
    color: "white",
    border: "none",
    padding: "10px",
    cursor: "pointer",
  },
};