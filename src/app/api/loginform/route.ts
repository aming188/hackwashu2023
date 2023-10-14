import Cookies from "js-cookie";
import { prisma } from "../../../db"
import { NextResponse } from 'next/server'
const jwt = require('jsonwebtoken');

//hashing
const bcrypt = require('bcrypt');

export async function POST(req: Request) {
    const data = await req.json();
    const username = data.username;
    const passGuess = data.password;

    let userMatch;
    let noResponse;

    const usernameSize = username.length
    const passSize = passGuess.length
    console.log("username size: ", usernameSize, ". passSize: ", passSize)
    if(usernameSize < 8 || passSize < 1) {
        noResponse = true
    } else {
        noResponse = false;
    }
    console.log("noResponse: ", noResponse)

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

    const match = await bcrypt.compare(passGuess, userMatch.profilePassword);
        const secretKey = 'fhfiewvrenviejeijvirj';
        const userId = userMatch.profileId;


        if(match) {
            const token = jwt.sign(userId, secretKey)
            Cookies.set("token", token)
            return NextResponse.json({loggedIn: true, message: "logged in", token, noResponse: noResponse})
        } else {
            return NextResponse.json({loggedIn: false, message: "passwords do not match", noResponse: noResponse})
        }
}