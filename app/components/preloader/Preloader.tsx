"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import "./Preloader.scss";
import Logo from '../../assets/logo.svg';

const ANIMATION_DURATIONS = {
    draw: 1500,
    delay: 2000,
    fill: 500,
    pause: 1000,
    slide: 1000
} as const;
const LETTER_DELAYS = {
    slow: 500,
    medium: 250,
    quick: 50,
    range: 100
} as const;
function useTimeout(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback);
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
        if (delay === null) return;
        const id = setTimeout(() => savedCallback.current(), delay);
        return () => clearTimeout(id);
    }, [delay]);
}
interface PreloaderProps {
    onComplete?: () => void;
}
export default function Preloader({ onComplete }: PreloaderProps = {}) {
    const [visible, setVisible] = useState(true);
    const [animateOut, setAnimateOut] = useState(false);
    const [textIndex, setTextIndex] = useState(0);
    const [logoDrawn, setLogoDrawn] = useState(false);
    const logoRef = useRef<SVGSVGElement>(null);
    const text = "Skybound Studio";
    const getLetterDelay = () => {
        const rand = Math.random();
        if (rand < 0.15) return LETTER_DELAYS.slow;
        if (rand < 0.35) return LETTER_DELAYS.medium;
        return LETTER_DELAYS.quick + Math.random() * (LETTER_DELAYS.range - LETTER_DELAYS.quick);
    };
    useEffect(() => {
        const logoEl = logoRef.current;
        if (!logoEl) return;
        const paths = Array.from(logoEl.querySelectorAll('path')) as SVGPathElement[];
        if (!paths.length) return;
        paths.forEach(path => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = `${length}`;
            path.style.strokeDashoffset = `${length}`;
            path.style.transition = "none";
        });
        requestAnimationFrame(() => {
        if (logoRef.current) logoRef.current.style.opacity = "1";
            paths.forEach(path => {
                path.style.transition = `stroke-dashoffset ${ANIMATION_DURATIONS.draw}ms ease`;
                path.style.strokeDashoffset = "0";
            });
        });
        setTimeout(() => {
            paths.forEach(path => {
                path.style.transition = `fill ${ANIMATION_DURATIONS.fill}ms ease`;
                path.style.fill = "var(--mainTextColor)";
            });
            setTimeout(() => setLogoDrawn(true), ANIMATION_DURATIONS.fill);
        }, ANIMATION_DURATIONS.delay);
    }, []);
    useEffect(() => {
        if (!logoDrawn) return;
        if (textIndex < text.length) {
            const letterTimer = setTimeout(() => setTextIndex(textIndex + 1), getLetterDelay());
            return () => clearTimeout(letterTimer);
        }
    }, [textIndex, logoDrawn]);
    useTimeout(
        () => setAnimateOut(true),
        textIndex === text.length ? ANIMATION_DURATIONS.pause : null
    );
    useTimeout(
        () => {
            setVisible(false);
            onComplete?.();
        },
        animateOut ? ANIMATION_DURATIONS.slide : null
    );
    if (!visible) return null;
    return (
        <div
            className={`preloader ${animateOut ? "out" : ""}`}
            role="status"
            aria-live="polite"
            aria-label="Page loading"
        >
            <Logo
                ref={logoRef}
                className="logo"
                aria-hidden="true"
            />
            <div className="text" style={{ opacity: logoDrawn ? 1 : 0 }}>
                <span className="placeholder" aria-hidden="true">{text}</span>
                <h2 aria-label={`Loading: ${text.slice(0, textIndex)}`}>
                    {text.slice(0, textIndex)}
                </h2>
            </div>
        </div>
    );
}