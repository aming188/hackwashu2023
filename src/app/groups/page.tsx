'use client';
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";


export default function GroupHome(){
    const [formData, setFormData] = useState({groupName: '', size:1});
    //take in cookie from user
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/groupList', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json();
            const token = data.token;
            console.log(token)
            if(data.groupCreation) {
                console.log("group creation success")
                //Cookies.set("token", token)
            }
            else {
                console.log("group creation failed: ", data.message)
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
            <header>
                <h1 className="flex justify-center">
                    Groups
                </h1>
            </header>
            <div className = "flex justify-center">
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8 p-4 bg-white shadow-lg rounded">
                    <input 
                        placeholder = "New group name" 
                        name = "groupName"
                        onChange= {handleInputChange}
                        className="border bg-transparent rounded px-1 py-1 outline-none"
                        value = {formData.groupName}
                        required>
                    </input>
                    <button type="submit" className="flex gap-1 border px-1 py-1 rounded outline-none">
                        Create
                    </button>
                </form>
            </div>
            <div>
                <Link href="/landingpage">
                    <button>
                        Home
                    </button>
                </Link>
            </div>
        </>
    )
}