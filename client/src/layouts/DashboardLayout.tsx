import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <header style={styles.header}>
        
        {/* Left: Sidebar toggle */}
        <button onClick={toggleSidebar} style={styles.hamburger}>
          ☰
        </button>

        {/* Center: School Name (from DB later) */}
        <div style={styles.schoolName}>
          School Name Here
        </div>

        {/* Right: Profile placeholder */}
        <div style={styles.rightSection}>
          👤
        </div>
      </header>

      {/* BODY */}
      <div style={styles.body}>

        {/* SIDEBAR */}
        <aside
          style={{
            ...styles.sidebar,
            width: sidebarOpen ? "220px" : "60px",
          }}
        >
          <p>Dashboard</p>
          <p>Users</p>
          <p>Messages</p>
          <p>Settings</p>
        </aside>

        {/* MAIN CONTENT */}
        <main style={styles.main}>
          <h2>Welcome back 👋</h2>
          {children}
        </main>
      </div>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <span>© School Name - All rights reserved</span>
        <button style={styles.logout}>Logout</button>
      </footer>

    </div>
  );
};

export default DashboardLayout;

/* ---------------- STYLES ---------------- */

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
    fontSize: "20px",
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
  },

  main: {
    flex: 1,
    background: "#f1f5f9",
    padding: "20px",
  },

  footer: {
    height: "40px",
    background: "#e2e8f0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 15px",
  },

  logout: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
};