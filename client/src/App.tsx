import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/Users";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;