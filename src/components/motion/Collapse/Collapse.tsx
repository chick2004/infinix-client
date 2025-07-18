"use client";

import React, { useRef, useEffect, useState } from "react";

export default function Collapse({ children, visible, duration = 300 }: {children: React.ReactNode, visible: boolean, duration?: number}) {
    
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<string | number>(visible ? "auto" : 0);

    // ResizeObserver để theo dõi thay đổi kích thước content
    useEffect(() => {
        const el = ref.current;
        if (!el || !visible) return;

        const resizeObserver = new ResizeObserver(() => {
            if (visible && height === "auto") {
                // Khi content thay đổi và collapse đang mở, giữ height là auto
                el.style.height = "auto";
            }
        });

        resizeObserver.observe(el);

        return () => {
            resizeObserver.disconnect();
        };
    }, [visible, height]);

    useEffect(() => {
        const el = ref.current;

        if (!el) return;

        if (visible) {
            // Reset về height cụ thể trước khi animate
            el.style.height = `${el.scrollHeight}px`;
            el.style.overflow = "hidden";
            
            setTimeout(() => {
                setHeight("auto");
                el.style.overflow = "visible";
            }, duration);
        } else {
            el.style.overflow = "hidden";
            // Đảm bảo có height cụ thể trước khi collapse
            if (height === "auto") {
                el.style.height = `${el.scrollHeight}px`;
            }
            requestAnimationFrame(() => {
                setHeight(0);
            });
        }
    }, [visible, duration]);

    return (
        <div 
            ref={ref} 
            style={{ 
                height: height, 
                overflow: visible && height === "auto" ? "visible" : "hidden", 
                transition: `height ${duration}ms ease`, 
                scrollbarWidth: "none" 
            }}
        >
            {children}
        </div>
    );
};
