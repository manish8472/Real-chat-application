import React, { useContext, useEffect, useRef} from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import { downloadMedia } from './downloadMedia';

const Message = ({message}) => {

  //if message send then chatbar automatic scroll
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({behavior:"smooth"});
  }, [message]);


  // 
  const {currentUser} = useContext(AuthContext)
  return (
    <div 
    ref={ref}
    className={`message ${message.senderId === currentUser.uid && "owner"}`}>

      <div className="messageContent" style={{position:'relative'}}>
        {message.text && <p >{message.text}</p>}
        {message.file && <p className='img' style={{position:'relative'}}><PictureAsPdfIcon style={{color: "black", paddingRight:"10px"}}/>
          <a href={message.file} >{message.fileName}</a>
          <DownloadIcon className='messageImgIcon' onClick={(e) =>downloadMedia(e, message.file)}  style={{position :'absolute' , bottom:'0', right:'0', zIndex:'100'}} /></p>}
        {message.img && <div style={{position:'relative'}} className='messageImage'>
            <DownloadIcon className='messageImgIcon' onClick={(e) =>downloadMedia(e, message.img)}  style={{position :'absolute' , bottom:'0', right:'0', zIndex:'100'}} />
          <img src={message.img}
          
         /> 
        
      </div>}
      {message.text && <div style={{color:"#1A5F7A", fontSize:"0.6rem" ,position :'absolute' , bottom:'0', right:'0', margin:"0px 5px 5px 0px"}}>{message.time}</div>}
      {message.file && <div style={{color:"black", fontSize:"0.6rem" ,position :'absolute' , bottom:'0', right:'30px', margin:"0px 5px 1px 0px"}}>{message.time}</div>}
      {message.img && <div style={{color:"white", fontSize:"0.6rem" ,position :'absolute' , bottom:'0', right:'40px', margin:"0px 5px 5px 0px"}}>{message.time}</div>}
      </div>
      
    </div>
  )
}

export default Message
