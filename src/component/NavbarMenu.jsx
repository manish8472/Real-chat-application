import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import {Menu, styled} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseApp';
import { useNavigate } from 'react-router-dom'

export default function NavbarMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

  const MenuOption = styled(MenuItem)`
        font-size: 14px;
  `

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

//   useEffect(() =>{
//     if(img){
//         updateProfile(auth.currentUser, {
//             photoURL: img,
//         });
//         setImg(null); 
//     }
//   }, [1000])

  // function handleChange(event){
    
  //   const img = event.target.files[0]
  //   // setImg(img);
    
  //   updateProfile(auth.currentUser, {
  //       photoURL: img,
  //   });

  // }

  const navigate = useNavigate();
  function signout(){
      
    signOut(auth).then(() => {
      window.location.reload(true);
      navigate("/login")
     
      // Sign-out successful.
    }).catch((error) => {
      console.log("some error occur");
    });
    
  }

  return (
    <div>
         <Button
        id="basic-button"
        
        onClick={handleClick}
      >
        <MoreVertIcon />
     </Button>

        
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical:"top",
            horizontal:"right",
        }}
      >
        {/* <input type='file' style={{display:"none"}} id='files' onChange={handleChange} />
        <label htmlFor='files'>
        <MenuOption onClick={handleClose}>Update Profile Pic</MenuOption>
        </label> */}
        <MenuOption onClick={signout}>Logout</MenuOption>
      </Menu>
    </div>
  )
}
