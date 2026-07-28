import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const AdminRoute = ({ children }) => {
  const { token, isAdmin, authReady } = useContext(StoreContext)

  if (!authReady) {
    return <div>Loading...</div>
  }
  if (!token || !isAdmin) {
    return <Navigate to='/' replace />
  }
  return children
}

export default AdminRoute
