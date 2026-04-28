import React, {useState} from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar.jsx'
import Home from './pages/home/Home.jsx'
import Cart from './pages/cart/Cart.jsx'
import PlaceOrder from './pages/placeOrder/PlaceOrder.jsx'
import Footer from './components/footer/Footer.jsx'
import LoginPopup from './components/loginPopup/LoginPopup.jsx'

const App = () => {

  const [showLogin, setShowLogin]=useState(false);

  console.log('App component render')
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
        <Route path='*' element={<Home/>} />
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App