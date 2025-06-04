"use client";

import { useState, useEffect, forwardRef, useRef } from "react";

import ImgProps from "./Img.types";

export default function Img({ src, alt, width, height, fill, style, className, onClick }: ImgProps) {
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        fetch(src)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch image');
                }
                return response.blob();
            })
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                setImageUrl(url);
            })
            .catch((error) => {
                console.error('Error fetching image:', error);
            });
    }, [src]);

    return (
        <img src={imageUrl} alt={alt} width={width} height={height} style={style} className={className} onClick={onClick}/>
    );
}