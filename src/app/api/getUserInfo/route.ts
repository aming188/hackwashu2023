import Cookies from "js-cookie";
import { prisma } from "../../../db"
import { NextRequest, NextResponse } from 'next/server'

const jwt = require('jsonwebtoken');

export async function POST(req: Request) {
    const data = await req.json();
    //user info
    const email = data.email;
    console.log("Email: " + email);
    try {
        const findUser = await prisma.user.findFirst({
            where: {
                email: email,
            },
        })
        if(findUser) {
            console.log("USER FOUND")
        } else {
            console.log("NOT FOUND");
            return NextResponse.json({user: null, accountFound: false, success: false});
        }
        return NextResponse.json({user: findUser, accountCreated: true, success: true})
    } catch (error: any) {
        return NextResponse.json({user: null, accountCreated: false, success: false, message: error.message, code: error.code})
    }
}