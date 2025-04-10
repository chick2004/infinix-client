"use client";

import { useState, useEffect } from "react";

type KeyframeInput = {
    [key: string]: Partial<CSSStyleDeclaration>;
};

export enum MotionName { FADE_IN = "fade-in", FADE_OUT = "fade-out", SCALE_UP_IN = "scale-up-in", SCALE_UP_OUT = "scale-up-out", SCALE_DOWN_IN = "scale-down-in", SCALE_DOWN_OUT = "scale-down-out", SLIDE_LEFT_IN = "slide-left-in", SLIDE_LEFT_OUT = "slide-left-out", SLIDE_RIGHT_IN = "slide-right-in", SLIDE_RIGHT_OUT = "slide-right-out", SLIDE_UP_IN = "slide-up-in", SLIDE_UP_OUT = "slide-up-out", SLIDE_DOWN_IN = "slide-down-in", SLIDE_DOWN_OUT = "slide-down-out" }

const EASING_FUNCTION_1 = 'cubic-bezier(.1, .9, .2, 1)';
const EASING_FUNCTION_2 = 'cubic-bezier(.1, .25, .75, .9)';

const DURATION_1 = 167;
const DURATION_2 = 267;
const DURATION_3 = 367;
const DURATION_4 = 467;

type MotionDistance = 10 | 20 | 40 | 400;

class Animation {

    name: string;
    duration: number;
    timing: string;

    constructor(name: string, duration: number, timing: string) {
        this.name = name;
        this.duration = duration;
        this.timing = timing;
    }

    toCSSProperties(): React.CSSProperties  {
        return {
            animationName: this.name,
            animationDuration: `${this.duration}ms`,
            animationTimingFunction: this.timing,
        };
    }

    static toCSSProperties(name: string, duration: number, timing: string): React.CSSProperties  {
        return {
            animationName: name,
            animationDuration: `${duration}ms`,
            animationTimingFunction: timing,
        };
    }
}

function clearAnimation(): React.CSSProperties {
    return {
        animationName: "none",
        animationDuration: "0ms",
        animationTimingFunction: "none",
    }
}

function createMotionStyle(name: MotionName, distance: MotionDistance = 10): Animation  {
    switch (name) {
        case MotionName.FADE_IN:
            return new Animation(fadeIn(), DURATION_1, EASING_FUNCTION_1);
        case MotionName.FADE_OUT:
            return new Animation(fadeOut(), DURATION_1, EASING_FUNCTION_1);
        case MotionName.SCALE_UP_IN:
            return new Animation(`${fadeIn()}, ${scaleUp103()}`, DURATION_3, EASING_FUNCTION_1);
        case MotionName.SCALE_UP_OUT:
            return new Animation(`${fadeOut()}, ${scaleUp100()}`, DURATION_1, EASING_FUNCTION_2);
        case MotionName.SCALE_DOWN_IN:
            return new Animation(`${fadeIn()}, ${scaleDown100()}`, DURATION_3, EASING_FUNCTION_1);
        case MotionName.SCALE_DOWN_OUT:
            return new Animation(`${fadeOut()}, ${scaleDown98()}`, DURATION_1, EASING_FUNCTION_2);
        case MotionName.SLIDE_LEFT_IN:
            return new Animation(`${fadeIn()}, ${slideLeftIn(distance)}`, DURATION_1, EASING_FUNCTION_1);
        case MotionName.SLIDE_LEFT_OUT:
            return new Animation(`${fadeOut()}, ${slideLeftOut(distance)}`, DURATION_1, EASING_FUNCTION_1);
        case MotionName.SLIDE_RIGHT_IN:
            return new Animation(`${fadeIn()}, ${slideRightIn(distance)}`, DURATION_1, EASING_FUNCTION_1);
        case MotionName.SLIDE_RIGHT_OUT:
            return new Animation(`${fadeOut()}, ${slideRightOut(distance)}`, DURATION_1, EASING_FUNCTION_1);
        case MotionName.SLIDE_UP_IN:
            return new Animation(`${fadeIn()}, ${slideUpIn(distance)}`, DURATION_1, EASING_FUNCTION_1);
        case MotionName.SLIDE_UP_OUT:
            return new Animation(`${fadeOut()}, ${slideUpOut(distance)}`, DURATION_1, EASING_FUNCTION_1);
        case MotionName.SLIDE_DOWN_IN:
            return new Animation(`${fadeIn()}, ${slideDownIn(distance)}`, DURATION_1, EASING_FUNCTION_1);
        case MotionName.SLIDE_DOWN_OUT:
            return new Animation(`${fadeOut()}, ${slideDownOut(distance)}`, DURATION_1, EASING_FUNCTION_1);
    }
}

interface MotionOptions {
    appear?: MotionName;
    appearDistance?: MotionDistance;
    disappear?: MotionName;
    disappearDistance?: MotionDistance;
  }

export function useMotion(visible: boolean, { appear, appearDistance = 20,  disappear, disappearDistance = 20 }: MotionOptions) {
    
    const [shouldRender, setShouldRender] = useState<boolean>(visible);
    const [animationStyle, setAnimationStyle] = useState<React.CSSProperties>({});
  
    useEffect(() => {

        const appearAnimation = appear ? createMotionStyle(appear, appearDistance) : undefined
        const disappearAnimation = disappear ? createMotionStyle(disappear, disappearDistance) : undefined

        if (visible) {
            if (appearAnimation) {
                setAnimationStyle(appearAnimation.toCSSProperties());
            }
            setShouldRender(true);
        } else {
            if (disappearAnimation) {
                setAnimationStyle(disappearAnimation.toCSSProperties());
                const timeout = setTimeout(() => {
                    setShouldRender(false);
                }, disappearAnimation.duration);
                return () => clearTimeout(timeout);
            } else {
                setShouldRender(false);
            }
        }
    }, [visible, appear, disappear]);
  
    return {
        shouldRender,
        animationStyle,
    };
}

let keyframeCounter = 0;

const keyframeCache = new Map<string, string>();

export function keyframes(frames: KeyframeInput): string {
    const framesString = JSON.stringify(frames);
    if (keyframeCache.has(framesString)) {
        return keyframeCache.get(framesString)!;
    }

    const name = `keyframe_${keyframeCounter++}`;
    keyframeCache.set(framesString, name);

    const normalizedFrames: KeyframeInput = {};
    for (const key in frames) {
        const normalizedKey = key === 'from' ? '0%' : key === 'to' ? '100%' : key;
        normalizedFrames[normalizedKey] = frames[key];
    }

    const css = Object.entries(normalizedFrames)
        .map(([key, styles]) => {
            const styleString = Object.entries(styles!)
                .map(([prop, value]) => `${camelCaseToKebabCase(prop)}: ${value};`)
                .join(' ');
            return `${key} { ${styleString} }`;
        })
        .join(' ');

    const rule = `@keyframes ${name} { ${css} }`;

    const styleSheet = document.styleSheets[0] || createStyleSheet();
    styleSheet.insertRule(rule, styleSheet.cssRules.length);

    return name;
}

export function clearUnusedKeyframes() {
    const styleSheet = document.styleSheets[0];
    if (!styleSheet) return;

    for (let i = styleSheet.cssRules.length - 1; i >= 0; i--) {
        const rule = styleSheet.cssRules[i];
        if (rule instanceof CSSKeyframesRule && rule.name.startsWith('keyframe_')) {
            styleSheet.deleteRule(i);
        }
    }

    keyframeCache.clear();
}

function camelCaseToKebabCase(str: string): string {
    return str.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
}

function createStyleSheet(): CSSStyleSheet {
    const style = document.createElement('style');
    document.head.appendChild(style);
    return style.sheet as CSSStyleSheet;
}

const fadeIn = () => keyframes({
    "0%": { opacity: "0" },
    "100%": { opacity: "1" },
});

const fadeOut = () => keyframes({
    "0%": { opacity: "1" },
    "100%": { opacity: "0" },
});

const slideRightIn = (distance: MotionDistance) => {
    return createSlideInX(-distance);
};

const slideRightOut = (distance: MotionDistance) => {
    return createSlideOutX(distance);
};

const slideLeftIn = (distance: MotionDistance) => {
    return createSlideInX(distance);
};

const slideLeftOut = (distance: MotionDistance) => {
    return createSlideOutX(-distance);
};

const slideUpIn = (distance: MotionDistance) => {
    return createSlideInY(distance);
}

const slideUpOut = (distance: MotionDistance) => {
    return createSlideOutY(-distance);
}

const slideDownIn = (distance: MotionDistance) => {
    return createSlideInY(-distance);
}

const slideDownOut = (distance: MotionDistance) => {
    return createSlideOutY(distance);
}

const scaleUp100 = () => {
    return keyframes({
        "0%": { transform: "scale3d(0.98, 0.98, 1)" },
        "100%": { transform: "scale3d(1, 1, 1)" },
    });
}

const scaleDown98 = () => {
    return keyframes({
        "0%": { transform: "scale3d(1, 1, 1)" },
        "100%": { transform: "scale3d(0.98, 0.98, 1)" },
    });
}

const scaleDown100 = () => {
    return keyframes({
        "0%": { transform: "scale3d(1.03, 1.03, 1.03)" },
        "100%": { transform: "scale3d(1, 1, 1)" },
    });
}

const scaleUp103 = () => {
    return keyframes({
        "0%": { transform: "scale3d(1, 1, 1)" },
        "100%": { transform: "scale3d(1.03, 1.03, 1.03)" },
    });
}

function createSlideInX(fromX: number): string {
    return keyframes({
        "0%": { transform: `translate3d(${fromX}px,0,0)`, pointerEvents: 'none' },
        "100%": { transform: `translate3d(0,0,0)`, pointerEvents: 'auto' },
    });
}

function createSlideInY(fromY: number): string {
    return keyframes({
        "0%": { transform: `translate3d(0,${fromY}px,0)`, pointerEvents: 'none' },
        "100%": { transform: `translate3d(0,0,0)`, pointerEvents: 'auto' },
    });
}

function createSlideOutX(toX: number): string {
    return keyframes({
        "0%": { transform: `translate3d(0,0,0)` },
        "100%": { transform: `translate3d(${toX}px,0,0)` },
    });
}

function createSlideOutY(toY: number): string {
    return keyframes({
        "0%": { transform: `translate3d(0,0,0)` },
        "100%": { transform: `translate3d(0,${toY}px,0)` },
    });
}
