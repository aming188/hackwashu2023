'use client';
import Link from "next/link";
import React, { useState } from 'react'

export default function TransactionsHome() {
    const [formData, setFormData] = useState({expense:'', description:'', groupName:''});
    
    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/transactionform', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json();
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
                <Link href="/">
                    <button className = 'max-w-sm mx-auto mt-8 p-4 bg-white shadow-lg rounded'>
                        Home
                    </button>
                </Link>
            </div>
        </>
    )
}











// 'use client';
// import Link from "next/link";
// import { prisma } from "@/db"

// async function createExpense(data: FormData){
//     const expense = data.get("expense")?.valueOf()
//     const description = data.get("description")?.valueOf()
//     const groupName = data.get("groupName")?.valueOf()
//     if( typeof expense !== "string"){
//          throw new Error("invalid expense")
//     }
//     await prisma.expenses.create({data: {expense: expense as string, description: description as string, groupName: groupName as string}})
//     console.log("new expense")
//     window.location.href= ".../landingpage"
// }

// export default function transactionsHome(){
//     return (
//         <>
//             <header>
//                 <h1 className="flex justify-center">
//                     Add Expense
//                 </h1>
//             </header>

//             <div>
//                 <form action={createExpense} className = "flex gap-2 flex-col">
//                     <input 
//                         type = "text"
//                         placeholder = "Enter amount" 
//                         name = "expense"
//                         className="border bg-transparent rounded px-1 py-1 outline-none"
//                         required>
//                     </input>
//                     <input 
//                         type = "text" 
//                         placeholder = "Enter a description" 
//                         name = "description"
//                         className="border bg-transparent rounded px-1 py-1 outline-none"
//                         required>
//                     </input>
//                     <input 
//                         type = "text" 
//                         placeholder = "Enter group name" 
//                         name = "groupName"
//                         className="border bg-transparent rounded px-1 py-1 outline-none"
//                         required>
//                     </input>
//                     <div className="flex gap-1 justify-end">
//                         <button type="submit" className="border px-1 py-1 rounded outline-none">
//                             Submit
//                         </button>
//                     </div>
//                 </form>
//             </div>

//             <div>
//                 <Link href="/">
//                     <button>
//                         Home
//                     </button>
//                 </Link>
//             </div>
//         </>
//     )
// }