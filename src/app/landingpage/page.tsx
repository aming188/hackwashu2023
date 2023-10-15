'use client'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Link from "next/link";

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
    <>
    <div className='flex justify-center'>
        <h1> WELCOME {tokenVal}! </h1>
    </div>
    
    <div className='flex justify-center'>
        <Link href='/profile'>
          <button className='border border-gray-500 hover:border-gray-700 text-gray-700 hover:text-gray-900 font-bold py-2 px-4 rounded'>
            Profile!
          </button> 
        </Link> 
        <Link href='/transactions'>
          <button className='border border-gray-500 hover:border-gray-700 text-gray-700 hover:text-gray-900 font-bold py-2 px-4 rounded'>
            Pay/Request!
          </button> 
        </Link> 
        <Link href='/groups'>
          <button className='border border-gray-500 hover:border-gray-700 text-gray-700 hover:text-gray-900 font-bold py-2 px-4 rounded'>
            Groups!
          </button> 
        </Link> 
    </div>
    </>
  );
};

export default LandingPage;
