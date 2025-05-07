import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SideBar from './components/sideBar/SideBar'
import Main from './components/mainPage/Main'

function App() {
  
  return (
    
     <div>
      <SideBar></SideBar>
      <Main/>


     </div>
      
  )
}

export default App
