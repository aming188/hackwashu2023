'use client';
import Link from "next/link";
import { useState } from 'react'
import { useRouter } from "next/router";
const jwt = require('jsonwebtoken')
const jwt_key = "fijwfijweoewfiwjecmjpivjwpof"

export default function SignUpHome() {
    const [formData, setFormData] = useState({firstName: '', lastName: '', email: '', password: ''});
    
    const handleSubmit = async () => {
        const authToken = jwt.sign(formData.email, jwt_key);
        try {
            const createUser = await fetch('/api/signupform', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer {authToken}'
                },
                body: JSON.stringify(formData)
            })
            const data = await createUser.json();
            const router = useRouter()
            if(data.accountCreated) {
                router.push({
                    pathname: '../../landingpage',
                    query: {token: data.token}
                })
            }
            console.log("account created issue");
        } catch(error) {
            console.log("Fetch Issue");
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
                    <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        className="input-field mb-6 w-full"
                        required
                    />
                    <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        className="input-field mb-6 w-full"
                        required
                    />
                    <button type="submit" className="btn-primary w-full">
                        Create Account
                    </button>
                </form>
            </div>
            <div className = 'flex justify-center'>
                <Link href="/">
                    <button className = 'max-w-sm mx-auto mt-8 p-4 bg-white shadow-lg rounded'>
                        Home
                    </button>
                </Link>
            </div>
        </>
    )
}