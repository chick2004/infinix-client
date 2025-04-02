"use client";
import { useContext, createContext } from "react";

export const AuthContext = createContext<{ user: any; setUser: React.Dispatch<React.SetStateAction<any>>} | null >(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}