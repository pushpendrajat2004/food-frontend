import React, { useContext, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
import './Verify.css'

const Verify = () => {
  const [searchParams] = useSearchParams()
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")
  const razorpay_payment_id = searchParams.get("razorpay_payment_id")
  const razorpay_order_id = searchParams.get("razorpay_order_id")
  const razorpay_signature = searchParams.get("razorpay_signature")

  const { url, token } = useContext(StoreContext)
  const navigate = useNavigate()

  const verifyPayment = async () => {
    if (!success || !orderId || !razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !token) {
      console.warn('Missing verify payload or auth token. Skipping backend verification.')
      navigate('/')
      return
    } 

    try {
      const response = await axios.post(
        `${url}/api/order/verify`,
        { orderId, razorpay_payment_id, razorpay_order_id, razorpay_signature },
        { headers: { token } }
      );

      if (response.data.success) {
        navigate('/myorders')
      } else {
        navigate('/')
      }
    } catch (error) {
      console.error('Verification error:', error)
      navigate('/')
    }
  };

  // Run the verification as soon as the component loads
  useEffect(() => {
    verifyPayment()
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify