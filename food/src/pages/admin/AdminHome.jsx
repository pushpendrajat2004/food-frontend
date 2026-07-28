import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
import './AdminHome.css'

const AdminHome = () => {
  const { url, token, setToken } = useContext(StoreContext)
  const [adminEmails, setAdminEmails] = useState([])
  const [newEmail, setNewEmail] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(`${url}/api/admin/emails`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (response.data.success) {
          setAdminEmails(response.data.data)
        }
      } catch (error) {
        console.error('fetchEmails error', error)
      }
    }

    if (token) {
      fetchEmails()
    }
  }, [token, url])

  const addEmail = async (event) => {
    event.preventDefault()
    setStatus('')
    try {
      const response = await axios.post(
        `${url}/api/admin/emails`,
        { email: newEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (response.data.success) {
        setStatus('Email added successfully.')
        setNewEmail('')
        setAdminEmails((prev) => [...prev, { email: newEmail, createdAt: new Date().toISOString(), createdBy: 'you' }])
      } else {
        setStatus(response.data.message || 'Unable to add email')
      }
    } catch (error) {
      setStatus(error.response?.data?.message || 'Request failed')
      console.error('addEmail error', error)
    }
  }

  return (
    <div className='admin-page'>
      <h1>Admin Portal</h1>
      <div className='admin-panel'>
        <form onSubmit={addEmail} className='admin-form'>
          <label htmlFor='admin-email'>Add admin email</label>
          <input
            id='admin-email'
            type='email'
            placeholder='new-admin@example.com'
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
          <button type='submit'>Add Admin Email</button>
        </form>
        {status && <p className='admin-status'>{status}</p>}
        <div className='admin-list'>
          <h2>Admin emails</h2>
          <ul>
            {adminEmails.map((item) => (
              <li key={item.email}>{item.email}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AdminHome
