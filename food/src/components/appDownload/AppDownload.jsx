import React from 'react'
import './AppDownload.css'
import {assets} from '../../assets/assets'

const AppDownload = () => {
  console.log('AppDownload component is rendering');
  return (
    <div className='app-download' id='app-download'>
        <p>For a richer ordering experience, download the Kannu's app today.</p>
        <div className='app-download-platform'>
            <img src={assets.play_store} alt="Google Play" />
            <img src={assets.app_store} alt="App Store" />
        </div>
    </div>
  )
}

export default AppDownload
