"use client";
import { useContext, createContext } from "react";

export interface AuthContextType {
    user: any;
    refetchUser: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}