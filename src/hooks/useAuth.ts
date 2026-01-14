"use client";
import type { User } from "@/types";
import { useContext, createContext } from "react";

export interface AuthContextType {
    user: User | null;
    refetchUser: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}