import React from 'react'
import './ExploreMenu.css'
import {menu_list} from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Choose your feast</h1>
      <p className='explore-menu-text'>Discover delicious meals from local chefs and street food favorites, curated for fast delivery and bold flavour.</p>
        <div className='explore-menu-list'>
            {menu_list.map((item, index)=>{
                return(
                    <div onClick={()=> setCategory(prev=>prev===item.menu_name?'all':item.menu_name)} key={index} className={category===item.menu_name?'explore-menu-list-item active':'explore-menu-list-item'}>
                        <img src={item.menu_image} alt={item.menu_name} />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr/>
    </div>
  )
}

export default ExploreMenu