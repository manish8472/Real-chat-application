import React, { useContext, useState } from 'react'
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../context/ChatContext';
import useWindowDimensions from './useWindowDimensions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Chat = () => {
  const {data} = useContext(ChatContext)
  const { height, width } = useWindowDimensions();
  const [chatClose , setChatClose] = useState(!data)
  
  
  
  return (
     <>
  {<div className='chat'>
      <div className="chatInfo">
        <div className="profile">
        {width<=750 && <ArrowBackIcon />}
        {data.user.photoURL && <> 
           <img src={data.user.photoURL} ></img>
          <span>{data.user?.displayName}
          </span></> }
          </div> 
        
        <div className='chatIcons'>
          {/* <VideoCallIcon className='img' />
          <CallIcon className='img'/> */}
          {/* <img src={VideoCallIcon} alt="" />
          <img src="" alt="" />
          <img src="" alt="" /> */}
        </div>
      </div>
      <Messages />
      <Input /> 
      
    </div>  }

    
    </>
  )
}

export default Chat

