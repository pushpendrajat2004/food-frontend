import React, {useState, useContext} from 'react'
import './LoginPopup.css'
import {assets} from '../../assets/assets'

const LoginPopup = ({setShowLogin}) => {

    const [currState,setCurrState]=useState("Sign Up")

  return (
    <div className='login-popup'>
      <form className='login-popup-container'>
        <div className='login-popup-title'>
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt='' />
        </div>
        <div className='login-popup-inputs'>
            {currState==="Login"?<></>:<input type="text" placeholder='your Name' required />}
            <input type="email" placeholder='your email' required />
            <input type="password" placeholder='password' required />
        </div>
        <button>{currState==='sign up'?'Create account':'Login'}</button>
        <div className='login-popup-condition'>
            <input type='checkbox' required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState==='Login'
        ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>click here</span></p>
        :<p>lready havbe an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup
