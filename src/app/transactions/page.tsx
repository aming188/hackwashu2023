'use client';
import Link from "next/link";
<<<<<<< HEAD
import React, { useState } from 'react'
import Cookies from 'js-cookie'

export default function TransactionsHome() {
    const email = Cookies.get("token")
    console.log(email)
    const [formData, setFormData] = useState({email: {email}, expense:'', description:'', groupName:''});
=======
import { useState } from 'react'

export default function TransactionsHome() {
    const [formData, setFormData] = useState({expense:0, description:'', groupName:''});
>>>>>>> 3e245ace1dfecace19db6f58d839efd3d63c557f
    
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/transactionform', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json();
            console.log("Expense: " + data.expense)
            console.log("Description: " + data.description)
            console.log("Group name: " + data.groupName)
            if(data.expenseAdded) {
                console.log("success")
                window.location.href= ".../../landingpage"
            }
            else{
                console.log("failed to add expense")
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
                        placeholder = "Enter amount" 
                        name = "expense"
                        onChange= {handleInputChange}
                        className="border bg-transparent rounded px-1 py-1 outline-none"
                        value = {formData.expense}
                        required>
                    </input>
                    <input 
                        placeholder = "Enter a description" 
                        name = "description"
                        onChange= {handleInputChange}
                        className="border bg-transparent rounded px-1 py-1 outline-none"
                        value = {formData.description}
                        required>
                    </input>
                    <input 
                        placeholder = "Enter group name" 
                        name = "groupName"
                        onChange= {handleInputChange}
                        className="border bg-transparent rounded px-1 py-1 outline-none"
                        value = {formData.groupName}
                        required>
                    </input>
                    <button type="submit" className="flex gap-1 justify-end border px-1 py-1 rounded outline-none">
                        Submit
                    </button>
                </form>
            </div>
            <div className = 'flex justify-center'>
                <Link href="/landingpage">
                    <button className = 'max-w-sm mx-auto mt-8 p-4 bg-white shadow-lg rounded'>
                        Home
                    </button>
                </Link>
            </div>
        </>
    )
}