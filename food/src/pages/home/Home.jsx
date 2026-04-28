import React, {useState} from 'react'
import './Home.css'
import Header from '../../components/header/Header.jsx'
import ExploreMenu from '../../components/exploreMenu/ExploreMenu.jsx'
import FoodDisplay from '../../components/foodDisplay/FoodDisplay.jsx'
import AppDownload from '../../components/appDownload/AppDownload.jsx'

const Home = () => {
  console.log('Home component render')

  const [category, setCategory]= useState("all");

  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload/>
    </div>
  )
}

export default Home
