"use client";
import { useMemo, useEffect, useState, useRef } from "react";
import { useFetch, AuthContext } from "@/hooks";
import { useRouter, usePathname  } from "next/navigation";
import { LoadingPage } from "@/components";

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const router = useRouter();
    const pathname = usePathname();
    
    useFetch(process.env.NEXT_PUBLIC_COOKIE_URL, useMemo(() => ({
        method: "GET",
        credentials: "include"
    }), []), true);

    const { data, loading, status } = useFetch(process.env.NEXT_PUBLIC_API_URL + "/user", useMemo(() => ({
        method: "GET",
    }), []), true);

    useEffect(() => {
        if (status === 200) {
            setUser(data);
        } else if (status === 401 && !["/login", "/register", "/"].includes(pathname)) {
            router.push("/login");
        }
    }, [status]);

    if (!user && !["/login", "/register"].includes(pathname)) {
        return <LoadingPage/>;
    }

    return (
        <AuthContext.Provider value={{ user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};
