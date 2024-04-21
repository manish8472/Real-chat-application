import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebaseApp';
import { ChatContext } from '../context/ChatContext';


const Chats = () => {

  const [chats , setChats] = useState([])
  const {currentUser} = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [display, setDisplay] = useState(false);
  

  useEffect(()=>{
    const getChats = () =>{
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
        // console.log("Current data: ", doc.data());
      });

      return () =>{
        unsub();
      };
    };

    currentUser.uid && getChats();
    

  }, [currentUser.uid])

  const handleSelect = (u)=>{
    dispatch({type :"CHANGE_USER" , payload: u});
    setDisplay("profile")
  }

  // console.log(Object.entries(chats));
  return (
        
    <div className='chats'>
      
    {Object.entries(chats)?.sort((a,b)=> b[1].date - a[1].date).map((chat) => (
        <div className={`userChat ${display}`} key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
        <img height={250} width={250} src={chat[1].userInfo.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{chat[1].userInfo.displayName}</span>
          <p>{chat[1].lastMessase?.text}</p>
          
        </div>
        </div>
      
      ))}
      
      
    </div>
    
  )
}

export default Chats
