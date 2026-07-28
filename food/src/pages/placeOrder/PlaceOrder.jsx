import React, {useContext, useEffect, useState} from 'react'
import './PlaceOrder.css'
import {StoreContext} from '../../context/StoreContext.jsx'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const PlaceOrder = () => {

    const {getTotalCartAmount, token, food_list, cartItems, url} = useContext(StoreContext)

    const [data, setData]= useState({
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      phone: ""
    })

    const onChangeHandler = (event) => {
      const name =  event.target.name 
      const value = event.target.value
      setData(data => ({ ...data, [name]:value}))
    }

    const placeOrder = async (event) => {
      event.preventDefault()

      // 1. Structure cart data for your backend api
      let orderItems = []
      food_list.map((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = { ...item } // Use spread operator to prevent mutating original objects
          itemInfo["quantity"] = cartItems[item._id]
          orderItems.push(itemInfo)
        }
      })

      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 10 // Food total + delivery fee
      }

      try {
        // 2. Contact your express backend endpoint
        let response = await axios.post(
          url + "/api/order/place",
          orderData,
          { headers: { Authorization: `Bearer ${token}` } }
        )
    
        if (response.data.success) {
          // Deconstruct values returned from your completed backend script
          const { razorpayOrder, orderId } = response.data

          // 3. Configure the Razorpay payment modal window
          const options = {
            key: "rzp_test_TFlaqFXHdziDyF", // Replace with your actual RAZORPAY_KEY_ID
            amount: razorpayOrder.amount,         // Amount in paisa coming from server
            currency: razorpayOrder.currency,
            name: "Kannu's Kitchen",
            description: "Secure payment for your Kannu's meal order",
            order_id: razorpayOrder.id,           // The crucial ID created by your backend instance
            handler: async function (paymentResponse) {
              // This block runs automatically when the user types pin and pays successfully!
              try {
                // Send payment transaction details back to backend to mark order as "Paid"
                const verifyData = {
                  orderId: orderId,
                  razorpay_payment_id: paymentResponse.razorpay_payment_id,
                  razorpay_order_id: paymentResponse.razorpay_order_id,
                  razorpay_signature: paymentResponse.razorpay_signature
                }
            
                let verifyResponse = await axios.post(
                  url + "/api/order/verify",
                  verifyData,
                  { headers: { Authorization: `Bearer ${token}` } }
                )
            
                if (verifyResponse.data.success) {
                  alert("Order placed successfully!")
                  // Pro-tip: Redirect user to a "/myorders" summary screen here
                } else {
                  alert("Payment verification failed.")
                }
              } catch (err) {
                alert("Error confirming your payment.")
              }
            },
            prefill: {
              name: "Customer Name", // Optional profile variables
              email: "customer@example.com"
            },
            theme: {
              color: "#ff5533" // Custom color branding matching your delivery app style
            }
          }

      // 4. Open the Razorpay Interface modal natively over your React UI
      const rzp = new window.Razorpay(options)
      rzp.open()

    } else {
      alert("Error initializing order processing.")
    }
  } catch (error) {
    console.error("Order setup exception:", error)
    alert("An error occurred. Check backend console connection.")
  }
}

  const navigate = useNavigate()

  useEffect(()=>{
    if(!token || getTotalCartAmount() === 0){
      navigate('/cart')
    }
  },[])

  return (
    <form onSubmit={placeOrder} className='place-order'>

      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>

        <div className='multi-fields'>
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last name' />
        </div>

        <input required name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Email address'/>
        <input required name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder='street'/>

        <div className='multi-fields'>
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>

        <div className='multi-fields'>
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip code" />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>

        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone'/>

      </div>

      <div className='place-order-right'>

        <div className="cart-total">
          <h2>Cart Total</h2>
          
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotalCartAmount()===0?0:10}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Total=</p>
              <b>$ {getTotalCartAmount()===0?0:getTotalCartAmount()+10}</b>
            </div>
          </div>

          <button type='submit'>Place order & pay</button>
        </div>

      </div>
    </form>
  )
}

export default PlaceOrder