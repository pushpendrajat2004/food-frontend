import React from 'react'

const AdminLoginToggle = ({ adminLogin, setAdminLogin }) => {
  return (
    <div className='admin-login-toggle'>
      <label>
        <input
          type='checkbox'
          checked={adminLogin}
          onChange={() => setAdminLogin(!adminLogin)}
        />
        Login as admin
      </label>
    </div>
  )
}

export default AdminLoginToggle
