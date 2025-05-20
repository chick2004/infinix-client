"use client";
import { useEffect, useState} from "react";
import { useRequest, AuthContext } from "@/hooks";
import { useRouter, usePathname  } from "next/navigation";
import { LoadingPage } from "@/components";
 

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {

    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={{ user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};
