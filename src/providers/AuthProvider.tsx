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
        console.log("Cookie initialized successfully:");
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
        console.log("User fetched successfully:", data);
        return data;
    }

    const userQuery = useQuery({
        queryKey: [userQueryUrl],
        queryFn: queryUser,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: false,
        staleTime: 1000 * 60 * 5,
    });

    useEffect(() => {
        if (userQuery.status === "success" && userQuery.data) {
            setUser(userQuery.data.data);
        }
    }, [userQuery.status, userQuery.data]);

    useEffect(() => {
        if (userQuery.status === "error" && userQuery.error) {
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

    return (
        <AuthContext.Provider value={{ user, setUser, refetchUser: userQuery.refetch }}>
            {children}
        </AuthContext.Provider>
    );
};
