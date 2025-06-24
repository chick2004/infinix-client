"use client";

import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {


    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
        router.replace(`/profile/${user.id}`);
        }
    }, [user]);
    
    return null
}