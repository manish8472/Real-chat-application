import React from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendIcon from '@mui/icons-material/Send';
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseApp';
import {v4 as uuid} from "uuid"
import { getDownloadURL,ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebaseApp';

function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const [newText, setNewText] = useState("");

  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  function getTime(){
    var currentTime = new Date();
    var hour = currentTime.getHours();
    if(hour>="0" && hour<="9"){
      hour = "0" + hour;
    }
    var min = currentTime.getMinutes();
    if(min>="0" && min<="9"){
      min = "0" + min;
    }

    return hour + " : " + min;
  }

  const handleSend = async() =>{
    if(file){

      const  location = uuid() + "/" + file.name;
      const path = "chatsImgage/" + location ;
      // const fileRef = storageRef.child(path);
      
      const storageRef = ref(storage, path);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        
        'state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default :
                            console.log()
                    }
                },
        (error) => {
            // Handle unsuccessful uploads
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
              case 'storage/canceled':
                // User canceled the upload
                break;
        
              // ...
        
              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
            console.log("Handle unsuccessful uploads")
            
        },
        () => {

         
          getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
            console.log('File available at', downloadURL);
            await updateDoc(doc(db, "chats", data.chatId),{
              messages: arrayUnion({
                id : location,
                senderId : currentUser.uid,
                date: Timestamp.now(),
                file: downloadURL ,
                fileName : text,
                time: getTime(),
              }),
            })
         });
        }
     );
     
    setImg(null)
    setText("")
    setFile(null);

    }
    else if(img){
      const  location = uuid()  + "/" + img.name;
      const path = "chatsImgage/" + location ;
      // console.log(path)
      // const fileRef = storageRef.child(path);
      
      const storageRef = ref(storage, path);
      // console.log(storageRef);

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        
        'state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                            default :
                            console.log()
                    }
                },
        (error) => {
            // Handle unsuccessful uploads
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
              case 'storage/canceled':
                // User canceled the upload
                break;
        
              // ...
        
              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
            console.log("Handle unsuccessful uploads")
            
        },
        () => {

         
          getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
            console.log('File available at', downloadURL);
            await updateDoc(doc(db, "chats", data.chatId),{
              messages: arrayUnion({
                id : location,
                senderId : currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
                time: getTime(), 
              }),
            })
         });
        }
     );
     setNewText("Image");
     await updateDoc(doc(db, "userChats", currentUser.uid) , {
      [data.chatId + ".lastMessase"] : {
        newText
      },
      [data.chatId + ".date"] : serverTimestamp(),
    })

    await updateDoc(doc(db, "userChats", data.user.uid) , {
      [data.chatId + ".lastMessase"] :{
        newText
      },
      [data.chatId + ".date"] : serverTimestamp(),
    })
    setImg(null)
    setText("")
    }
    else if(text!="") {
      await updateDoc(doc(db, "chats", data.chatId),{
        messages: arrayUnion({
          id : uuid(),
          text,
          senderId : currentUser.uid,
          date: Timestamp.now(),
          time: getTime(),
        }),
      });
      await updateDoc(doc(db, "userChats", currentUser.uid) , {
        [data.chatId + ".lastMessase"] : {
          text
        },
        [data.chatId + ".date"] : serverTimestamp(),
      })
  
      await updateDoc(doc(db, "userChats", data.user.uid) , {
        [data.chatId + ".lastMessase"] : {
          text
        } ,
        [data.chatId + ".date"] : serverTimestamp(),
      })
      setText("");
      setNewText("");
    }
  }

  const sendFile = (e) =>{
    setFile(e.target.files[0]);
    setText(e.target.files[0].name)
  }

  const sendImg = (e) =>{
    setImg(e.target.files[0]);
    setText(e.target.files[0].name)
  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  }

  return (
    <div className='inputMessage'>
     {data.user.uid && <> <input id="text" type="text" placeholder='Type a message..'
       onChange={e => setText(e.target.value)}
       onKeyDown={handleKey} 
       autoFocus={true}
       value={text}
       />
      <div className="send">
        <input type="file" style={{ display: "none" }} name="attach" id="attach" onChange={sendFile} />
        <label htmlFor="attach" >
          <AttachFileIcon className='icon' />
        </label>
        <input type="file"  id="photo" style={{ display: "none" }}
         onChange={sendImg}
        //  e=>setImg(e.target.files[0])
          />

        <label htmlFor="photo" >
          <ImageOutlinedIcon className='icon' />
        </label>
        
        <SendIcon className='icon' onClick={handleSend} />
      </div> </> }
    </div>
  )
}

export default Input
