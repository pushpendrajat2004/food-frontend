import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
            <h1>KANNU'S</h1>
            <p>Order the best street-style meals and signature chef bowls from Kannu's kitchen. Fast delivery, bold spice, and comfort food made just for you.</p>
            <div className='footer-social-icons' >
                <img src={assets.facebook_icon} alt="Facebook" />
                <img src={assets.twitter_icon} alt="Twitter" />
                <img src={assets.linkedin_icon} alt="LinkedIn" />
            </div>
        </div>
        <div className='footer-content-center'>
            <h2>EXPLORE</h2>
            <ul>
                <li>Home</li>
                <li>Menu</li>
                <li>Orders</li>
                <li>Support</li>
            </ul>
        </div>
        <div className='footer-content-right'>
            <h2>CONTACT</h2>
            <ul>
                <li>+91 98765 43210</li>
                <li>support@kannusfood.com</li>
            </ul>
        </div>
      </div>
      <hr/>
      <p className="footer-copyright">copyright 2027 @ kannusfood.com - All Rights Reserved</p>
    </div>
  )
}

export default Footer
