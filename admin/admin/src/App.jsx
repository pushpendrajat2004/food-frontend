import React from 'react'
import Navbar from './components/navbar/Navbar.jsx'
import SideBar from './components/sidebar/SideBar.jsx'

const App = () => {
  return (
    <div>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <SideBar/>
      </div>
    </div>
  )
}

export default App
