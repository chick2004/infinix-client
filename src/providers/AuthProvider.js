"use client";
import { useMemo, useEffect, useState, useRef } from "react";
import { useFetch, AuthContext } from "@/hooks";
import { useRouter, usePathname  } from "next/navigation";

export const AuthProvider = ({ children }) => {

    console.log("AuthProvider");
    const [user, setUser] = useState(null);
    const router = useRouter();
    const pathname = usePathname();

    const { data, loading, error, status, execute } = useFetch(process.env.NEXT_PUBLIC_API_URL + "/user", useMemo(() => ({
        method: "GET",
    }), []), true);

    // useEffect(() => {

    //     setInterval(() => {
    //         execute();
    //     }, 1000 * 60);

    //     return () => {
    //         clearInterval();
    //     }
    // }, []);

    useEffect(() => {
        if (status === 200) {
            setUser(data);
        } else if (status === 401 && !["/login", "/register"].includes(pathname)) {
            router.push("/login");
        }
    }, [status]);

    if (!user && !["/login", "/register"].includes(pathname)) {
        return "Loading...";
    }

    return (
        <AuthContext.Provider value={{ user, setUser, loading}}>
            {children}
        </AuthContext.Provider>
    );
};
