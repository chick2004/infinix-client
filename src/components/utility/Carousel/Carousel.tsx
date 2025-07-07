"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button, Icon, Video } from "@/components";
import CarouselProps from "./Carousel.types";
import styles from "./Carousel.module.scss";

export default function Carousel({ medias, className, style, ref, showIndicators = true, showArrows = true }: CarouselProps) {
    
    const [currentIndex, setCurrentIndex] = useState(1);
    const [realIndex, setRealIndex] = useState(0);
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    const slideRef = useRef<HTMLDivElement>(null);

    const extendedSlides = medias.length > 1 ? [medias[medias.length - 1], ...medias, medias[0]] : medias;

    const handleNext = () => {
        if (transitionEnabled) return; // Prevent rapid slide change
        setCurrentIndex(prev => prev + 1);
        setRealIndex((prev) => (prev + 1) % medias.length);
        setTransitionEnabled(true);
    };
    
    const handlePrev = () => {
        if (transitionEnabled) return; // Prevent rapid slide change
        setCurrentIndex(prev => prev - 1);
        setRealIndex((prev) => (prev - 1 + medias.length) % medias.length);
        setTransitionEnabled(true);
    };

    const handleTransitionEnd = () => {
        if (currentIndex === 0) {
            setTransitionEnabled(false);
            setCurrentIndex(medias.length);
        } else if (currentIndex === extendedSlides.length - 1) {
            setTransitionEnabled(false);
            setCurrentIndex(1);
        } else {
            setTransitionEnabled(false); // Allow next transition
        }
    };

    useEffect(() => {
        if (!slideRef.current) return;

        const slide = slideRef.current;
        requestAnimationFrame(() => {
            slide.style.transition = transitionEnabled ? "transform 0.5s ease-in-out" : "none";
            slide.style.transform = `translateX(-${currentIndex * 100}%)`;
        });
    }, [currentIndex, transitionEnabled]);

    const root = clsx(
        styles.root,
        className
    );

    return (
        <div className={root} style={style} ref={ref}>
            <div className={styles.slides} ref={slideRef} onTransitionEnd={handleTransitionEnd} >
                {extendedSlides.map((media, index) => (
                    <div key={index} className={styles.slide}>
                        {media.type.startsWith("video/") ? (
                            <Video src={process.env.NEXT_PUBLIC_API_URL + "/media"+ media.path.replace(process.env.NEXT_PUBLIC_SERVER_URL + "", "")} controls autoPlay muted loop style={{height: "100%", width: "100%", display: "block"}}/>
                        ) : (
                            <Image src={media.path} alt={`media-${index}`} fill />
                        )}
                    </div>
                ))}
            </div>

            {showIndicators && (
                <div className={styles.indicators}>
                    {medias.map((_, index) => (
                        <div key={index} className={styles.indicator_button}>
                            <div
                                className={`${styles.indicator} ${
                                    index === realIndex ? styles.active : ""
                                }`}
                            ></div>
                        </div>
                    ))}
                </div>
            )}

            {showArrows && (
                <div className={styles.arrows}>
                    <Button className={styles.arrow_left} onClick={handlePrev}>
                        <Icon name="chevron_left" />
                    </Button>
                    <Button className={styles.arrow_right} onClick={handleNext}>
                        <Icon name="chevron_right" />
                    </Button>
                </div>
            )}
        </div>
    );
}
