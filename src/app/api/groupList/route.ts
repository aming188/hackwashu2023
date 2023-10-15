import Cookies from "js-cookie";
import { prisma } from "../../../db"
import { NextResponse } from 'next/server'
const jwt = require('jsonwebtoken');

export async function POST(req: Request) {
    const data = await req.json(); 
    const groupName = data.groupName;
    const size = data.size;


    let group;
    console.log("Group: " + groupName);
    try {
        group = await prisma.groups.create({
            data:{
                groupName: groupName,
                size: size
            }
        })
        console.log("Group created: ", groupName)
        return NextResponse.json({groupCreation: true})

    } catch (error: any) {
        return NextResponse.json({groupCreation: false, message: error.message, code: error.code})
    }
}