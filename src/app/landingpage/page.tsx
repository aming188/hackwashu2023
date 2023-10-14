import { useRouter } from "next/router"
const jwt = require('jsonwebtoken')

export default function LandingPage() {
    const router = useRouter()
    const token = router.query;
    const email = jwt.decode(token);
    console.log("TOKEN: " + token + " EMAIL: " + email);
    return (
        <>
            <div>
                <h1> WELCOME! </h1>
            </div>
        </>
    )
}