"use client";
import { useEffect, useState} from "react";
import { AuthContext } from "@/hooks";
import { requestInit } from "@/lib";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter, usePathname  } from "next/navigation";
import { LoadingPage } from "@/components";
 

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {

    const [user, setUser] = useState(null);

    const router = useRouter();
    const pathname = usePathname();

    const initCookie = async () => {
        const response = await fetch(process.env.NEXT_PUBLIC_COOKIE_URL + "", requestInit("GET"));
        if (!response.ok) {
            throw new Error("Failed to fetch cookie");
        }
    }

    const cookieMutation = useMutation({
        mutationFn: initCookie,
        onError: (error) => {
            console.error("Error fetching cookie:", error);
        },
        onSuccess: () => {
            userQuery.refetch();
        }
    });

    const userQueryUrl = process.env.NEXT_PUBLIC_API_URL + "/user";
    const queryUser = async () => {
        const response = await fetch(userQueryUrl, requestInit("GET"));
        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }
        const data = response.json();
        return data;
    }

    const userQuery = useQuery({
        queryKey: [userQueryUrl],
        queryFn: queryUser,
        retry: false,
    });

    useEffect(() => {
        if (userQuery.isSuccess) {
            setUser(userQuery.data.data);
        }
    }, [userQuery.status, userQuery.data]);

    useEffect(() => {
        if (userQuery.isError) {
            if (!["/login", "/register"].includes(pathname)) {
                router.push("/login");
            }
        }
    }, [userQuery.status, userQuery.error, pathname, router]);


    useEffect(() => {
        cookieMutation.mutate();
    }, []);

    if (!user && !["/login", "/register"].includes(pathname)) {
        return (
            <LoadingPage/>
        );
    }

    if (user && (pathname === "/login" || pathname === "/register")) {
        router.push("/");
    }

    return (
        <AuthContext.Provider value={{ user, refetchUser: userQuery.refetch }}>
            {children}
        </AuthContext.Provider>
    );
};
