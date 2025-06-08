// src/admin/AdminRoute.jsx (or src/components/AdminRoute.jsx)
import { useContext } from "react";
import { AppContext } from "../context/AppContext"; // adjust path if needed
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const { userData } = useContext(AppContext);
  if(userData===false) return <div>Loading...</div>
  if (userData?.role === "admin") return children;
  return <Navigate to="/login" />;
}
