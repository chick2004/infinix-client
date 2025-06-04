"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export const objectToFormData = (obj: Record<string, any>, formData: FormData = new FormData(), parentKey?: string): FormData => {
    if (obj && typeof obj === 'object' && !(obj instanceof File)) {
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            const fullKey = parentKey ? `${parentKey}[${key}]` : key;

            if (value instanceof File) {
                formData.append(fullKey, value);
            } else if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    objectToFormData({ [`${index}`]: item }, formData, fullKey);
                });
            } else if (typeof value === 'object' && value !== null) {
                objectToFormData(value, formData, fullKey);
            } else if (value !== undefined && value !== null) {
                formData.append(fullKey, value.toString());
            }
        });
    }
    return formData;
};


export const useRequest = <T = any>(url: string, method: "GET" | "POST" | "PUT" | "DELETE" = "GET") => {

    const [data, setData] = useState<T>(() => ({} as T));
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<number | null>(null);

    const router = useRouter();

    const execute = useCallback(async (payload: Record<string, any> | null = null) => {

        setMessage("");
        setLoading(true);
        setError(null);
        setStatus(null);

        let body: BodyInit | null = null;
        const headers: HeadersInit = {
            "X-XSRF-TOKEN": decodeURIComponent(document.cookie.split("; ").find(row => row.startsWith("XSRF-TOKEN="))?.split("=")[1] || ""),
            "Accept": "application/json"
        };

        if (payload) {
            body = objectToFormData(payload);
        }

        try {
            const response = await fetch(url, {
                method,
                body: method !== "GET" ? body : null,
                headers,
                credentials: "include",
            });

            setStatus(response.status);

            if (!response.ok) {
                if (response.status === 401) {
                    router.push("/login");
                }
                const errorMessage = await response.text();
                setError(errorMessage || "An error occurred");
                return;
            }
            
            const json = await response.json().catch(() => null);
            setData(json.data);
            setMessage(json.message || "");

        } catch (error: any) {
            setError(error.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }, [url, method, router]);

    return { data, loading, error, status, execute };
};
