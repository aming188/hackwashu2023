'use client';
import Link from "next/link";
import { useState } from 'react'

export default function profileHome(){
    return (
        <>
            <header>
                <h1 className="flex justify-center">
                    Profile
                </h1>
            </header>
            <div>
                <Link href="/landingpage">
                    <button>
                        Home
                    </button>
                </Link>
            </div>
        </>
    )
}