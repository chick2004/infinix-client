"use client";

import { useState, useEffect } from "react";

export default function Video({ src, ...props }: React.VideoHTMLAttributes<HTMLVideoElement>) {
  
    const [videoUrl, setVideoUrl] = useState<string>("");

    useEffect(() => {
        if (src) {
        fetch(src)
            .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch video');
            }
            return response.blob();
            })
            .then((blob) => {
            const url = URL.createObjectURL(blob);
            setVideoUrl(url);
            })
            .catch((error) => {
            console.error('Error fetching video:', error);
            });
        }
    }, []);
  
    return (
        <video {...props}>
            {videoUrl && <source src={videoUrl} type="video/mp4" />}
            Your browser does not support the video tag.
        </video>
  );
}