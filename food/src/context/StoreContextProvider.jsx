import { useState, useEffect } from 'react'
import { StoreContext } from './StoreContext'
import { food_list } from '../assets/assets'

const StoreContextProvider = ({ children }) => {
    
  const [cartItems, setCartItems] = useState({})

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

  const  getTotalCartAmount= ()=>{
    let totalAmount=0;
    for(const item in cartItems){
      if(cartItems[item]>0){
      let itemInfo=food_list.find((product)=>product._id===item)
      totalAmount+= itemInfo.price*cartItems[item];
      }
    }
    return totalAmount;
  }

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount
  }

  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>
}

export default StoreContextProvider
