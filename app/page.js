// LoginPage.js
'use client'
import React, { useState } from 'react';
import './Login.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passKey, setPassKey] = useState('');
  const [error, setError] = useState(null);

  const router = useRouter()

  
  const handleLogin = async (event) => {
    event.preventDefault();
    // Add login logic here
    // console.log(username,password)

    if(email && password && passKey){
    // console.log(username,password)
      if(passKey === process.env.NEXT_PUBLIC_PASSKEY){
        try {
          const res = await axios.post(`${process.env.API_ENDPOINT}/auth/login`, {
            email: email,
            password: password
          })

          if(res.data){
            if(typeof window !== 'undefined'){
              localStorage.setItem('user', JSON.stringify(res.data))    
              router.push('/mainPage')
            }

          }else{
            console.log('invalid credentials')
            setError('invalid credentials')
          }

          
          
        } catch (error) {
          console.log(error)
        }
      }
      
    }else{
      setError('username or password not given')
      alert('username or password not given')
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Admin Panel</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your Email"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <label>PassKey:</label>
            <input
              type="password"
              value={passKey}
              onChange={(event) => setPassKey(event.target.value)}
              placeholder="Enter your passKey"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;