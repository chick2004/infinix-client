"use client";

import { useState, useEffect, forwardRef, useRef } from "react";
import { Icon, Slider } from "@/components";
import VideoProps from "./Video.types";
import styles from "./Video.module.scss";

export default function Video({ style, className, src, controls = true, autoPlay = false, loop = false, muted = false, poster }: VideoProps) {
  
    const [videoUrl, setVideoUrl] = useState<string>("");
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

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

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedMetadata = () => {
            setDuration(video.duration);
        };

        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime);
        };

        video.addEventListener("loadedmetadata", handleLoadedMetadata);
        video.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
            video.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, []);
  
    return (
        <div className={`${styles.video_container} ${className}`} style={style}>
            { videoUrl ? (
                <video className={styles.video} src={videoUrl} poster={poster} ref={videoRef}></video>
            ) : (
                <div className={styles.video_placeholder}>Loading...</div>
            )}
            <div className={styles.video_controls}>
                {isPlaying ? (
                    <button className={styles.video_play_button} onClick={() => {setIsPlaying(!isPlaying); videoRef.current?.pause();}}>
                        <Icon name={"pause"} size={20} type={"filled"} className={styles.text_primary}></Icon>
                    </button>
                ) : (
                    <button className={styles.video_pause_button} onClick={() => {setIsPlaying(!isPlaying); videoRef.current?.play();}}>
                        <Icon name={"play"} size={20} type={"filled"} className={styles.text_primary}></Icon>
                    </button>
                )}
                <div className={styles.video_time}>
                    1:02:30 / 2:30:00
                </div>
                <Slider className={styles.video_progress_bar} value={currentTime}>
                </Slider>
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