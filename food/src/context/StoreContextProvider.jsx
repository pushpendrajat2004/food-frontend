import { useState, useEffect } from 'react'
import axios from 'axios'
import { StoreContext } from './StoreContext'

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({})
  const url = import.meta.env.VITE_API_URL || 'http://localhost:4000'
  const [token, setToken] = useState('')
  const [foodList, setFoodList] = useState([])

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] ?? 0) + 1 }))
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const current = prev[itemId] ?? 0
      if (current <= 1) {
        const { [itemId]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [itemId]: current - 1 }
    })
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = foodList.find((product) => product._id === item)
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item]
        }
      }
    }
    return totalAmount
  }

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`)
      if (response?.data?.success) {
        setFoodList(response.data.data || [])
      } else {
        setFoodList([])
      }
    } catch (error) {
      console.error('Failed to fetch food list:', error)
      setFoodList([])
    }
  }

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList()
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        setToken(storedToken)
      }
    }
    loadData()
  }, [])

  const contextValue = {
    food_list: foodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  }

  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>
}

export default StoreContextProvider
