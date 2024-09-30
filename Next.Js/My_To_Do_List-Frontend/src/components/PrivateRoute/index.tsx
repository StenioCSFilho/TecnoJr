import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function PrivateRoute ({ children }: { children: ReactNode}) {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            router.push('/')
        } else {
            setIsAuthenticated(true)
        }
    }, [router])


    return isAuthenticated ? children : null
}