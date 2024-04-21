import React from 'react'
import Sidebar from '../component/Sidebar'
import Chat from '../component/Chat'
import '../component/style.scss'

const Home = () => {
  
  return (
    <div className='home'>
      <h2>MyChat</h2>
        <div className='container'>
          <Sidebar />
          <Chat />
        </div>
      
    </div>
  )
}

export default Home
