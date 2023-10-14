'use client'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const LandingPage = () => {
  const [tokenVal, setTokenVal] = useState('')
  useEffect(() => {
    // Retrieve token from the cookie
    const token = Cookies.get('token');

    // Use the token to make authenticated API requests, or perform other actions
    if (token) {
      console.log("token: " + token)
      setTokenVal(token)
    } else {
        console.log("INVALID TOKEN")
    }
  }, []);
  
  return (
    <div>
      <h1> WELCOME {tokenVal}! </h1>
    </div>
  );
};

export default LandingPage;
