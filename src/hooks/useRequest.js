"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

export const useRequest = (url, method = "GET") => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const router = useRouter();


    const execute = useCallback(async (formData = null) => {

        setLoading(true);
        setError(null);
        setStatus(null);

        const token = decodeURIComponent(document.cookie.split("; ").find((row) => row.startsWith("XSRF-TOKEN="))?.split("=")[1]);

        try {
            const response = await fetch(url, {
                method: method,
                body: formData,
                headers: {
                    'X-XSRF-TOKEN': token,
                },
                credentials: 'include',
            });
            const json = await response.json();
            setStatus(response.status);
            if (!response.ok) {
                if (response.status === 401) {
                    router.push("/login");
                }
                setError(json.message);
            }
            setData(json);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [url, method]);

    return { data, loading, error, status, execute };
}