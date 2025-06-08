// src/components/PrivateRoute.jsx
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AdminContext } from '../admin/context/AdminContext'
import { DoctorContext } from '../admin/context/DoctorContext'

const PrivateRoute = ({ children }) => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  if (aToken || dToken) {
    return children
  } else {
    return <Navigate to="/login" />
  }
}

export default PrivateRoute
