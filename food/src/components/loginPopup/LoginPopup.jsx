import React, {useState, useContext} from 'react'
import './LoginPopup.css'
import {assets} from '../../assets/assets'
import {StoreContext} from '../../context/StoreContext'
import axios from "axios"


const LoginPopup = ({setShowLogin}) => {

    const {url,setToken,setIsAdmin}= useContext(StoreContext)

    const [currState,setCurrState]=useState("Login")
    const [data, setData]=useState({
      name:"",
      email:"",
      password:""
    })
    const [adminLogin, setAdminLogin] = useState(false)
    const [status, setStatus] = useState('')

    const onChangeHandler = (event)=>{
      const name= event.target.name;
      const value= event.target.value;
      setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event) =>{
      event.preventDefault()
      
      let newUrl= url;
      if(currState==="Login"){
        newUrl += "/api/user/login"
      }else{
        newUrl += "/api/user/register"
      }

      const payload = { ...data }
      if (currState === 'Login' && adminLogin) {
        payload.adminLogin = true
      }

      try {
        const response = await axios.post(newUrl, payload);
        console.log("Response:", response.data); // Debug log

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setIsAdmin(currState === 'Login' && adminLogin);
          setStatus('Login successful')
          console.log("Token saved:", response.data.token); // Debug log
          setShowLogin(false);
        } else {
          setIsAdmin(false);
          setStatus(response.data.message || 'Login failed')
        }
      } catch (error) {
        console.error("Login error:", error)
        const message =
          error.response?.data?.message ||
          error.response?.statusText ||
          error.message ||
          "An unexpected error occurred"
        setStatus(message)
      }
    }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt='' />
        </div>
        <div className='login-popup-inputs'>
            {currState==="Login" ? null : <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder='your Name' required />}
            <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='your email' required />
            <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder='password' required />
        </div>
        <button type="submit">{currState==='Sign Up' ? 'Create account' : 'Login'}</button>
        <div className='login-popup-condition'>
            <input type='checkbox' required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {status && <p className='login-status'>{status}</p>}
        {currState==='Login'
        ?<>
          <div className='admin-login-row'>
            <label>
              <input type='checkbox' checked={adminLogin} onChange={() => setAdminLogin(!adminLogin)} />
              Login as admin
            </label>
          </div>
          <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>click here</span></p>
        </>
        :<p>lready havbe an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup
