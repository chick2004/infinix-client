"use client";

import { useEffect } from "react";
import { useRequest } from "./useRequest";

export const useFetch = <T = any>(url: string) => {

    const { data, loading, error, status, execute } = useRequest<T>(url, "GET");

    useEffect(() => {
        execute();
    }, [url, execute]);

    return { data, loading, error, status };
}