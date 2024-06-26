import React, { useContext, useEffect, useState } from 'react'
import { collection, query, where, serverTimestamp, setDoc, doc, updateDoc, getDoc, getDocs } from "firebase/firestore";
import { db } from '../firebaseApp';
import { AuthContext } from '../context/AuthContext';

const Searchbar = () => {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const {currentUser} = useContext(AuthContext)

  const handleSearch = async () => {
    const q = query(collection(db, "users"),
     where("displayName", "==", username));
      
    try {
      const querySnapshot = await getDocs(q);
      
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });

        
    }
    catch(error){
  //
    }
    if(username ===""){
      setUser(null);
    }

    
  }
  const handleKey = (e) => {
     handleSearch();
  }

  const handleSelect = async()=> {
    //check whether the group (chats in firestore) exists, if not create
    const combinedId = currentUser.uid > user.uid 
    ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    
    
    try{
      const res = await getDoc(doc(db, "chats" , combinedId ));

      if(!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId) , {messages: []});
  
        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"] : {
            uid: user.uid,
            displayName : user.displayName,
            photoURL:user.photoURL
            
          },
          [combinedId + ".date"] : serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"] : {
            uid: currentUser.uid,
            displayName : currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId + ".date"] : serverTimestamp()
        });

      }
  
        
     
    
    }
    catch(err){
    }

    setUser(null)
    setUsername("")
    
    //create user chats

  }

  function handleChange(event){
    let value = event.target.value;
    setUsername(value);
  }

  useEffect(() =>{
    handleSearch();
  },[username])

  return (
    <div className='search'>
      <div className="searchFrom">
        <input type="text"
         placeholder='Find a user by username' 
         onKeyDown={handleKey} 
         onChange={handleChange} 
         value={username}
          />
      </div>
     
       {/* {err && <span>User not found!</span>}    */}
      {user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>
      }

    </div>
  )
};

export default Searchbar


// value={username}