import React, { useState, useContext } from 'react'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
import './AdminLogin.css'

const AdminLogin = ({ setShowLogin }) => {
  const { url, setToken, setIsAdmin, setAuthReady } = useContext(StoreContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onLogin = async (event) => {
    event.preventDefault()
    setError('')

    try {
      const response = await axios.post(`${url}/api/user/login`, {
        email,
        password,
        adminLogin: true
      })

      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
        setIsAdmin(true)
        setAuthReady(true)
        setShowLogin(false)
      } else {
        setError(response.data.message || 'Login failed')
      }
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Unable to login'
      setError(message)
    }
  }

  return (
    <div className='admin-login'>
      <form onSubmit={onLogin} className='admin-login-form'>
        <h2>Admin Login</h2>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='admin email'
          required
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password'
          required
        />
        <button type='submit'>Login as Admin</button>
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default AdminLogin
