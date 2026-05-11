import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Layout
import DashboardLayout from "../layouts/DashboardLayout";

// Pages
import LibrarianDashboard from "../pages/librarian/LibrarianDashboard";
import ViewBooks from "../pages/librarian/ViewBooks";
import Reports from "../pages/librarian/Reports";
import PastPapers from "../pages/librarian/PastPapers";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/librarian" />} />

        {/* Librarian Routes */}
        <Route path="/librarian" element={<DashboardLayout />}>
          <Route index element={<LibrarianDashboard />} />
          <Route path="books" element={<ViewBooks />} />
          <Route path="reports" element={<Reports />} />
          <Route path="past-papers" element={<PastPapers />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default AppRoutes;