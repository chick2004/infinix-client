"use client";

import { useAuth } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { requestInit } from "@/lib";
import { useEffect } from "react";
import { LoadingPage } from "@/components";

export default function Page() {

    const { user } = useAuth();

    const conversationsQueryUrl = process.env.NEXT_PUBLIC_API_URL + "/users/" + user.id + "/conversations";
    const queryConversations = async () => {
        const response = await fetch(conversationsQueryUrl, requestInit("GET"));
        if (!response.ok) {
            throw new Error("Failed to fetch conversations");
        }
        return response.json();
    }
    const conversationsQuery = useQuery({
        queryKey: [conversationsQueryUrl],
        queryFn: queryConversations,
        refetchOnWindowFocus: false,
        retry: true,
        staleTime: 1000 * 60 * 5,
    });

    const router = useRouter();
    useEffect(() => {
        if (conversationsQuery.data?.data && conversationsQuery.data.data.length > 0) {
            router.push("/chat/" + conversationsQuery.data.data[0].id);
        }
    }, [conversationsQuery.data, router]);

    return (
        <LoadingPage></LoadingPage>
    )
} 