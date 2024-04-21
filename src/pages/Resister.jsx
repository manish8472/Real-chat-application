import React, { useState } from 'react'
import '../component/style.scss'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebaseApp";
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom"
import { storage } from '../firebaseApp';

function Resister() {
    const [err, setErr] = useState(false)
    const [wait, setWait] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (event) => {

        event.preventDefault();
        const displayName = event.target[0].value;
        const email = event.target[1].value;
        const password = event.target[2].value;
        const file = event.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            // console.log("In process")
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, name);
            // console.log("In process")

            const uploadTask = uploadBytesResumable(storageRef, file);
            // console.log("In process")
            setWait(true)
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
                    setErr(true)
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

                        await updateProfile(res.user, {
                            displayName: displayName,
                            photoURL: downloadURL
                        });

                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName: displayName,
                            email: email,
                            photoURL: downloadURL
                        });


                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    });
                }
                
            );
            setWait(false)

        }
        catch (err) {
            setErr(true)
        }

    }


    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className='logo'>MyChat</span>
                <span className='title'>Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Username' required/>
                    <input type="email" placeholder='Enter your email' required/>
                    <input type="password" placeholder='Password' required/>
                    {/* <label htmlFor="profilePhoto">Upload Profile pic.</label> */}
                    <span style={{color:"white"}}>Upload Profile pic</span> <input name="addImage" id="profilePhoto" type="file" style={{color:"white"}} required />
                    {/* <div>
                        <label htmlFor="upload">Upload profile pic</label>
                        <input style={{ display: "none" }} type="file" name="addImage" id="upload" placeholder='Add profile pic' />
                    </div> */}
                    <button type='submit'>Sign Up</button>
                    {err && <span style={{ color: "red" }}> Something went wrong OR already resistered</span>}
                    {!err && wait && <span style={{ color: "red" }}>Wait some second </span> }
                </form>
                <p>Do you have an account? <Link to="/login" style={{fontSize:'1.1rem'}}>Login</Link></p>
            </div>
        </div>
    )
}

export default Resister
