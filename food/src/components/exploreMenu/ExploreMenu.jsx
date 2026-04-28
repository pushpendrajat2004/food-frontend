import React from 'react'
import './ExploreMenu.css'
import {menu_list} from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1> Explore Our Menu</h1>
      <p className='explore-menu-text'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores animi amet enim harum error doloribus est quaerat numquam. Culpa, porro quae suscipit corporis consequuntur sapiente ducimus ut dolorem iure earum!</p>
        <div className='explore-menu-list'>
            {menu_list.map((item, index)=>{
                return(
                    <div onClick={()=> setCategory(prev=>prev===item.menu_name?'all':item.menu_name)} key={index} className={category===item.menu_name?'explore-menu-list-item active':'explore-menu-list-item'}>
                        <img src={item.menu_image} alt='' />
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