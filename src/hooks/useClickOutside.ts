"use client";

import React, { useEffect } from "react";

type ClickOutsideHandler = (event: MouseEvent | TouchEvent) => void;

export function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: ClickOutsideHandler) {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
        if (!ref.current || ref.current.contains(event.target as Node)) {
            return;
        }
            handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}
