import Cookies from "js-cookie";
import { prisma } from "../../../db"
import { NextResponse } from 'next/server'
const jwt = require('jsonwebtoken');

//hashing


export async function POST(req: Request) {
    const data = await req.json(); 
    const email = data.email;
    const passGuess = data.password;

    let userMatch;
    console.log("Email: " + email + ", Password: " + passGuess);
    try {
        userMatch = await prisma.user.findFirst({
            where: {
                email: email,
                password: passGuess
            },
            // select: {
            //     id: true,
            //     firstName: true,
            //     password: true
            // }
        })
        if(!userMatch){
            return NextResponse.json({loggedIn:false, message: 'User not found'})
        }
        if(passGuess === userMatch.password){
            return NextResponse.json({token: userMatch.email, loggedIn: true})
        }
        else{
            return NextResponse.json({loggedIn:false, message: 'Incorrect password'})
        }

    } catch (error: any) {
        return NextResponse.json({loggedIn: false, message: error.message, code: error.code})
    }
}