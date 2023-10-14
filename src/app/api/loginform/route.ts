import Cookies from "js-cookie";
import { prisma } from "../../../db"
import { NextResponse } from 'next/server'
const jwt = require('jsonwebtoken');

//hashing


export async function POST(req: Request) {
    const data = await req.json();
    const username = data.username;
    const passGuess = data.password;

    let userMatch;
    let noResponse;
    console.log("Username: " + username + ", Password: " + passGuess);
    try {
        userMatch = await prisma.profile.findFirstOrThrow({
            where: {
                OR: [
                    {
                        profileUsername: username
                    },
                    {
                        profileEmail: username
                    }
                ]
            },
            select: {
                profileId: true,
                profilePassword: true
            }
        })
    } catch (error: any) {
        return NextResponse.json({loggedIn: false, message: error.message, code: error.code})
    }
}