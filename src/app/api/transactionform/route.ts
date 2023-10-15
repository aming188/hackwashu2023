import { prisma } from "../../../db"
import { NextRequest, NextResponse } from 'next/server'

const jwt = require('jsonwebtoken');

export async function POST(req: Request) {
    const data = await req.json();
    
    const expense1 = parseFloat(data.expense);
    const description1 = data.description;
    const groupName1 = data.groupName;

    try {
        const info = await prisma.expenses.create({
            data: {
                expense: expense1,
                description: description1,
                groupName: groupName1
            },
        })
        console.log("Expense Added");
        return NextResponse.json({expenseAdded: true, success: true})
    } catch (error: any) {
        return NextResponse.json({expenseAdded: false, success: false, message: error.message, code: error.code})
    }
}