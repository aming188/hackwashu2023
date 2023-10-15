import Cookies from "js-cookie";
import { prisma } from "../../../db"
import { NextRequest, NextResponse } from 'next/server'

const jwt = require('jsonwebtoken');

export async function POST(req: Request) {
    const data = await req.json();
    

    //user info
    const email = data.email;
    const userFirstName = data.firstName;
    const userLastName = data.lastName;
    const password = data.password;
    console.log("Email: " + email + ", Password: " + password);
    try {
        const userMatch = await prisma.user.create({
            data: {
                email: email,
                firstName: userFirstName,
                lastName: userLastName,
                password: password
            },
        })
        console.log("User Created");
        return NextResponse.json({token: email, accountCreated: true, success: true})
    } catch (error: any) {
        return NextResponse.json({accountCreated: false, success: false, message: error.message, code: error.code})
    }
}