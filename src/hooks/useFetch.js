import { useState, useEffect, useMemo, useCallback  } from "react";
import { useRouter } from "next/navigation";


export const useFetch = (url, options, auto = false) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const router = useRouter();

    const memoizedOptions = useMemo(() => options, [JSON.stringify(options)]);

    const execute = useCallback(async () => {
        setLoading(true);
        setError(null);
        setStatus(null);

        const xsrfToken = document.cookie.split("; ").find((row) => row.startsWith("XSRF-TOKEN="))?.split("=")[1];

        try {
            const response = await fetch(url, {
                ...memoizedOptions,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
                    ...memoizedOptions.headers,
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
        
    }, [url, memoizedOptions]);

    if (auto) {
        useEffect(() => {
            execute();
        }, [execute]);
    }

    return { data, loading, error, status, execute };
};
