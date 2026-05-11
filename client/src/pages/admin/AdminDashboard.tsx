import DashboardLayout from "../../layouts/DashboardLayout";

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      
      {/* WELCOME SECTION */}
      <div style={styles.welcome}>
        <h1>Welcome back, Admin 👋</h1>
        <p>Here is what is happening in your school today</p>
      </div>

      {/* STATS CARDS */}
      <div style={styles.cards}>
        <div style={styles.card}>Students: 1200</div>
        <div style={styles.card}>Teachers: 80</div>
        <div style={styles.card}>Fees Paid: 2.5M</div>
        <div style={styles.card}>Pending Fees: 300K</div>
      </div>

    </DashboardLayout>
  );
};

export default AdminDashboard;

/* ---------------- STYLES ---------------- */

const styles: { [key: string]: React.CSSProperties } = {
  welcome: {
    marginBottom: "20px",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "15px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontWeight: "bold",
  },
};