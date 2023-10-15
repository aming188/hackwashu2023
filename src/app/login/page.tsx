'use client';
import Link from "next/link";
import { useState } from 'react'
const jwt = require('jsonwebtoken')
const jwt_key = "fijwfijweoewfiwjecmjpivjwpof"
import Cookies from "js-cookie";

export default function LoginHome() {
    const [formData, setFormData] = useState({email: '', password: ''});

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/loginform', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json();
            const token = data.token;
            console.log(token)
            if(data.loggedIn) {
                console.log("Login success")
                Cookies.set("token", token)
                window.location.href= ".../../landingpage"
            }
            else {
                console.log("Login failed: ", data.message)
            }
        } catch(error) {
            console.log(error);
        }
    }

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
    return (
        <>
            <div>
                <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8 p-4 bg-white shadow-lg rounded">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="input-field mb-4 w-full"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        className="input-field mb-6 w-full"
                        required
                    />
                    <button type="submit" className="btn-primary w-full">
                        Login
                    </button>
                </form>
            </div>
            <div>
                <Link href="/">
                    <button>
                        Home
                    </button>
                </Link>
            </div>
        </>
    )
}