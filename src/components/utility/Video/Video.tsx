"use client";

import clsx from "clsx";
import { useState, useEffect, useRef } from "react";
import { Icon, Slider } from "@/components";
import VideoProps from "./Video.types";
import styles from "./Video.module.scss";

export default function Video({ style, className, ref, src, controls = true, autoPlay = true, loop = true, muted = true, poster }: VideoProps) {
  
    const [videoUrl, setVideoUrl] = useState<string>("");
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
    const [progress, setProgress] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [volume, setVolume] = useState<number>(muted ? 0 : 100);

    const [isShowVolume, setIsShowVolume] = useState<boolean>(false);

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

        video.volume = volume / 100;

        const updateProgress = () => {
            if (!video.duration || isNaN(video.duration) || video.duration === 0) {
                setProgress(0);
                setCurrentTime(0);
                setDuration(0);
                return;
            }
            const percentage = (video.currentTime / video.duration) * 100;
            setProgress(isNaN(percentage) ? 0 : percentage);
            setCurrentTime(video.currentTime);
            setDuration(video.duration);
        };

        const handleEnded = () => {
            setIsPlaying(false);
        };

        video.addEventListener('timeupdate', updateProgress);
        video.addEventListener('ended', handleEnded);
        return () => {
            video.removeEventListener('timeupdate', updateProgress);
            video.removeEventListener('ended', handleEnded);
        };
    }, [videoUrl]);

    const handleVolumeChange = (val: number) => {
        setVolume(val);
        const video = videoRef.current;
        if (video) {
            video.volume = val / 100;
        }
    };

    const formatTime = (seconds: number) => {
        if (!seconds || isNaN(seconds)) return '00:00';
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        if (h > 0) {
            return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleSliderChange = (value: number) => {
        const val = Number(value);
        setProgress(val);
        const video = videoRef.current;
        if (video && video.duration) {
            video.currentTime = (val / 100) * video.duration;
        }
    };

    const root = clsx(
        styles.root,
        className
    )
  
    return (
        <div className={root} style={style} ref={ref}>
            { videoUrl ? (
                <video className={styles.video} src={videoUrl} poster={poster} ref={videoRef} autoPlay={autoPlay} loop={loop}></video>
            ) : (
                <div className={styles.video_placeholder}>Loading...</div>
            )}
            {controls && (
                <div className={styles.video_controls}>
                    {isPlaying ? (
                        <button className={styles.video_play_button} onClick={() => {setIsPlaying(!isPlaying); videoRef.current?.pause();}}>
                            <Icon name={"pause"} size={20} type={"filled"} className={styles.text_primary}></Icon>
                        </button>
                    ) : (
                        <button className={styles.video_play_button} onClick={() => {setIsPlaying(!isPlaying); videoRef.current?.play();}}>
                            <Icon name={"play"} size={20} type={"filled"} className={styles.text_primary}></Icon>
                        </button>
                    )}
                    <div className={styles.video_time}>
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                    <Slider className={styles.video_progress_bar} value={progress} onChange={handleSliderChange} min={0} max={100}>
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
                        {volume > 66 ? (
                            <button className={styles.video_volume_button} onClick={() => setIsShowVolume(!isShowVolume)}>
                                <Icon name={"speaker_2"} size={20} type={"filled"} className={styles.text_primary}></Icon>
                            </button>
                        ) : volume > 33 ? (
                            <button className={styles.video_volume_button} onClick={() => setIsShowVolume(!isShowVolume)}>
                                <Icon name={"speaker_1"} size={20} type={"filled"} className={styles.text_primary}></Icon>
                            </button>
                        ) : volume > 0 ? (
                            <button className={styles.video_volume_button} onClick={() => setIsShowVolume(!isShowVolume)}>
                                <Icon name={"speaker_0"} size={20} type={"filled"} className={styles.text_primary}></Icon>
                            </button>
                        ) : (
                            <button className={styles.video_volume_button} onClick={() => setIsShowVolume(!isShowVolume)}>
                                <Icon name={"speaker_mute"} size={20} type={"filled"} className={styles.text_primary}></Icon>
                            </button>
                        )}
                        {isShowVolume && (
                            <div className={styles.input_container}>
                                <Slider direction="vertical" min={0} max={100} value={volume} onChange={handleVolumeChange} />
                            </div>
                        )}
                        
                    </div>
                </div>
            )}  
        </div>
    );
}