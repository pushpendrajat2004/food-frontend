import React, {useContext} from 'react'
import './FoodDisplay.css'
import {StoreContext} from '../../context/StoreContext'
import FoodItem from '../foodItem/FoodItem.jsx'

const FoodDisplay = ({category}) => {

    const {food_list}= useContext(StoreContext)
    const filteredFoods = category === 'all' ? food_list : food_list.filter((item) => item.category === category)

  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className='food-display-list'>
          {filteredFoods.map((item)=>{
            return  <FoodItem key={item._id} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
          })}
        </div>
    </div>
  )
}

export default FoodDisplay
