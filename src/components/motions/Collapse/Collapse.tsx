"use client";

import React, { useRef, useEffect, useState } from "react";

export default function Collapse({ children, visible, duration = 300 }: {children: React.ReactNode, visible: boolean, duration?: number}) {
    
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<string | number>(visible ? "auto" : 0);

    useEffect(() => {

        const el = ref.current;

        if (!el) return;

        if (visible) {
            el.style.height = `${el.scrollHeight}px`;
            setTimeout(() => {
                setHeight("auto");
                el.style.overflow = "unset";
            }, duration);
        } else {
            
            el.style.overflow = "hidden";
            if (height === "auto") el.style.height = `${el.scrollHeight}px`;
            requestAnimationFrame(() => {
                setHeight(0);
            });
        }
    }, [visible]);

    return (
        <div ref={ref} style={{ height: height, overflow: "hidden", transition: `height ${duration}ms ease`, scrollbarWidth: "none" }}>
            {children}
        </div>
    );
};
