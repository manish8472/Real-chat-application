import React, { useState } from 'react'
import '../component/style.scss'
import {useNavigate, Link} from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {

    const [err, setErr] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (event) => {

        event.preventDefault();
        
        const email = event.target[0].value;
        const password = event.target[1].value;
        const auth = getAuth();

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")
        }
        catch (err) {
            setErr(true)
        }

    }

    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className='logo'>MyChat</span>
                <span className='title'>Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder='Enter your email' required />
                    <input type="password" placeholder='Enter Password' required/>
                    <button type='submit'>Sign In</button>
                    {err && <span style={{color:"red"}}>Wrong email or password</span>}
                </form>
                <p>Don,t have an account? <Link to="/resister" style={{fontSize:'1.1rem'}}>Register</Link></p>
            </div>
        </div>
    )
}

export default Login
