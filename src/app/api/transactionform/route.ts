import { prisma } from "../../../db"
import { NextRequest, NextResponse } from 'next/server'

const jwt = require('jsonwebtoken');

export async function POST(req: Request) {
    const data = await req.json();
    
    const expense1 = data.expense;
    const description1 = data.description;
    const groupName1 = data.groupName;
    console.log("Expense: " + expense1)
    console.log("Description: " + description1)
    console.log("Group name: " + groupName1)

    try {
        const userMatch = await prisma.expenses.create({
            data: {
                expense: expense1,
                description: description1,
                groupName: groupName1
            }
        })
        console.log("Expense Added");
        return NextResponse.json({expenseAdded: true, success: true})
    } catch (error: any) {
        return NextResponse.json({expenseAdded: false, success: false, message: error.message, code: error.code})
    }
}