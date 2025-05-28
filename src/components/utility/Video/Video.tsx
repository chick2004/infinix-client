"use client";

import { useState, useEffect, forwardRef, useRef } from "react";
import { Icon } from "@/components";
import VideoProps from "./Video.types";
import styles from "./Video.module.scss";

export default function Video({ style, className, src, controls = true, autoPlay = false, loop = false, muted = false, poster }: VideoProps) {
  
    const [videoUrl, setVideoUrl] = useState<string>("");
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        fetch(src)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch video');
                }
                return response.blob();
            }).then((blob) => {
                const url = URL.createObjectURL(blob);
                setVideoUrl(url);
            }).catch((error) => {
                console.error('Error fetching video:', error);
            });
    }, []);
  
    return (
        <div className={`${styles.video_container} ${className}`} style={style}>
            { videoUrl ? (
                <video className={styles.video} src={videoUrl} poster={poster}></video>
            ) : (
                <div className={styles.video_placeholder}>Loading...</div>
            )}
            <div className={styles.video_controls}>
                <button className={styles.video_play_button}>
                    <Icon name={"play"} size={20} type={"filled"} className={styles.text_primary}></Icon>
                </button>
                <div className={styles.video_time}>
                    1:02:30 / 2:30:00
                </div>
                <div className={styles.video_progress_bar}>
                    <input type="range" min={0} max={100} />
                </div>
                <div className={styles.video_settings}>
                    <button className={styles.video_setting_button}>
                        <Icon name={"setting"} size={20} type={"filled"} className={styles.text_primary}></Icon>
                    </button>
                </div>
                <div className={styles.video_fullscreen}>
                    <button className={styles.video_fullscreen_button}>
                        <Icon name={"full_screen_maximize"} size={20} type={"filled"} className={styles.text_primary}></Icon>
                    </button>
                </div>
                <div className={styles.video_pip_button}>
                    <button className={styles.video_pip_button_icon}>
                        <Icon name={"picture_in_picture"} size={20} type={"regular"} className={styles.text_primary}></Icon>
                    </button>
                </div>
                <div className={styles.video_volume}>
                    <button className={styles.video_volume_button}>
                        <Icon name={"speaker_1"} size={20} type={"filled"} className={styles.text_primary}></Icon>
                    </button>
                    <input type="range" min={0} max={100} />
                </div>
            </div>
        </div>
  );
}