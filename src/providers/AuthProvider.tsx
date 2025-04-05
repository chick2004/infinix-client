"use client";
import { useEffect, useState} from "react";
import { useRequest, AuthContext } from "@/hooks";
import { useRouter, usePathname  } from "next/navigation";
import { LoadingPage } from "@/components";
 

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {

    const [user, setUser] = useState(null);
    const router = useRouter();
    const pathname = usePathname();

    const {execute: executeGetCookie} = useRequest(process.env.NEXT_PUBLIC_COOKIE_URL + "");
    const { data, loading, status, execute: executeGetUser } = useRequest(process.env.NEXT_PUBLIC_API_URL + "/user", "GET");

    useEffect(() => {
        executeGetCookie().then(() => {
            executeGetUser();
        });
    }, []);

    useEffect(() => {
        if (status === 200) {
            setUser(data);
        } else if (status === 401 && !["/login", "/register", "/"].includes(pathname)) {
            router.push("/login");
        }
    }, [loading]);

    if (!user && !["/login", "/register"].includes(pathname)) {
        return (
            <LoadingPage/>
        );
    }

    return (
        <AuthContext.Provider value={{ user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};
