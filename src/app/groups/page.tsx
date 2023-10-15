'use client';
import Link from "next/link";
import { useState } from 'react'

export default function groupHome(){
    return (
        <>
            <header>
                <h1 className="flex justify-center">
                    Groups
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