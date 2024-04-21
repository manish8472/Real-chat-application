import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import NavbarMenu from './NavbarMenu'


const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  // console.log(currentUser.displayName)

  const navigate = useNavigate();
  // function signout(){
      
  //   signOut(auth).then(() => {
      
  //     navigate("/login")
  //     // Sign-out successful.
  //   }).catch((error) => {
  //     console.log("some error occur");
  //   });
    
  // }
  
  return (

    <div className='navbar'>
      {/* <span className='logo'>Manish Chat</span> */}
      <div className="user">
      <div className='userProfile'>
          
          <img src={currentUser.photoURL} alt="" />
          <p>{currentUser.displayName}</p>
        </div>
        <div>
          <NavbarMenu />
         {/* <button onClick={signout} >Logout</button> */}
        </div>
      </div>
    </div>
  )
}

export default Navbar
