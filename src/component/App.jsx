import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate, HashRouter} from "react-router-dom";
import Login from '../pages/Login'
import Resister from '../pages/Resister'
import Home from '../pages/Home';
import { AuthContext } from '../context/AuthContext';

function App() {

  const {currentUser} = useContext(AuthContext)

  const ProtectedRoute = ( {children}) =>{
    if(!currentUser){
      return <Navigate to="/login"/>
    }
    return children;
  }


  return (
     <HashRouter>
      <Routes>
        <Route path='/'>
          
          <Route path='login' element={<Login /> } />
          <Route index element={<ProtectedRoute> <Home/></ProtectedRoute> } />
          <Route path='resister' element={<Resister /> } />
        </Route>
      </Routes>
      </HashRouter>
  )
}

export default App
 
