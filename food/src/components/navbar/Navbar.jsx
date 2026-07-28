import React, { useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import LoginPopup from '../loginPopup/LoginPopup.jsx'

const Navbar = ({setShowLogin}) => {

    const [menu, setMenu]= useState("menu");
    const { getTotalCartAmount, token, setToken, isAdmin, setIsAdmin } = useContext(StoreContext);

    const navigate = useNavigate();

    const logout = ()=>{
      localStorage.removeItem("token");
      setToken("");
      if (typeof setIsAdmin === 'function') {
        setIsAdmin(false)
      }
      navigate("/");
    }

  return (
    <div className='navbar'>
      <Link to='/' className='navbar-logo'>KANNU'S</Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu("home")} className={menu==='home'?'active':''}>home</Link>
        <a href='#explorre-menu' onClick={()=>setMenu("menu")} className={menu==='menu'?'active':''}>menu</a>
        <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==='contact-us'?'active':''}>contact us</a>
        {isAdmin && token ? (
          <Link to='/admin' onClick={()=>setMenu("admin")} className={menu==='admin'?'active':''}>admin</Link>
        ) : null}
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alt="" />
        <div className='navbar-search-icon'>
            <Link to='/cart'><img src={assets.basket_icon} /></Link>
            <div className={getTotalCartAmount()?"dot":""} ></div>
        </div>
        {!token ? <button onClick={()=>setShowLogin(true)}>sign in</button> : 
        <div className='navbar-profile'>
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
            <li onClick={()=> navigate('/myOrders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
        </div>}
      </div>
    </div>
  )
}

export default Navbar