import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from "react-router-dom";
import axios from '../../../utils/axios'
import { USER_LOGIN } from '../../../utils/ConstUrls';
import toast, { Toaster } from 'react-hot-toast';
import "./login.scss";
import { setLogin } from '../../../redux/userSlice';
function Login() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleSubmit =async (event) => {
    event.preventDefault();
    
    if(email==="" || password === ""){
        return toast.error("Please Fill the Components")
    }
    const body= JSON.stringify({
      email,
      password
    })
    try{
      
    await axios.post(USER_LOGIN,body,{ headers: { "Content-Type": "application/json" } }).then(({data})=>{
      if(data.success){
        document.cookie=`token:${data.token}`
        dispatch(setLogin({
          user:data.userdetails,
          token:data.token
        }));
        console.log("suceess1")
        
        navigate('/home');
        console.log("suceess2")
      }else{
        toast.error(data.message)
      }
    
    }).catch((err)=>{
      console.log(err)
    })
    }catch(err){
        toast.error("Oops Something went wrong")
    }
  };
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>CODERHUB</h1>
         
          <span>Don't you have an account?</span>
          <Link to="/signup">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input type="text"  value={email}
                  onChange={(e)=>setEmail(e.target.value)} name="email" placeholder="Username" />
            <input type="password" placeholder="Password"  name="password"  value={password}
                  onChange={(e)=>setPassword(e.target.value)} />
            <button >Login</button>
          </form>
        </div>
      </div>
      <Toaster position="top-right"reverseOrder={false} />
    </div>
  )
}

export default Login