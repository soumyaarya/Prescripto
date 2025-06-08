// src/admin/DoctorRoute.jsx (or src/components/DoctorRoute.jsx)
import { useContext } from "react";
import { DoctorContext } from "../admin/context/DoctorContext"; // adjust path if needed
import { Navigate } from "react-router-dom";

export default function DoctorRoute({ children }) {
  const { dToken } = useContext(DoctorContext);
  // You can also add role check if your backend sends a role!
  if (dToken) return children;
  return <Navigate to="/login" />;
}
