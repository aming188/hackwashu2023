'use client';
import Link from "next/link";
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

export default function ProfileHome(){
    const [tokenVal, setTokenVal] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userFirst, setUserFirst] = useState('')
    const [userLast, setUserLast] = useState('')
    const getInfo = async () => {
        
        try {
            const response = await fetch('/api/getUserInfo', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tokenVal)
            })
            const data = await response.json()
            if(data.user) {
                const user = data.user;
                const email = user.email
                const firstName = user.firstName
                const lastName = user.lastName
                setUserEmail(email)
                setUserFirst(firstName)
                setUserLast(lastName)
            }
        } catch(error) {
            console.log(error)
        }
    }
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
    getInfo()
    return (
        <>
            <header>
                <h1 className="flex justify-center">
                    Profile Information
                </h1>
            </header>
            <div className="flex justify-center">
                <li> Email: {userEmail} </li>
                <li> First Name: {userFirst} </li>
                <li> Last Name: {userLast} </li>
            </div>
            <div className='flex justify-center'>
                <Link href="/landingpage">
                    <button className='border border-gray-500 hover:border-gray-700 text-gray-700 hover:text-gray-900 font-bold py-2 px-4 rounded'>
                        Home
                    </button>
                </Link>
            </div>
        </>
    )
}