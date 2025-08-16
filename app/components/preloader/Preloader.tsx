"use client";

import { useEffect, useState, useRef } from "react";
import "./Preloader.scss";
import Logo from '../../../app/assets/logo.svg';

export default function Preloader() {
    const [visible, setVisible] = useState(true);
    const [animateOut, setAnimateOut] = useState(false);
    const [textIndex, setTextIndex] = useState(0);
    const [logoDrawn, setLogoDrawn] = useState(false);
    const logoRef = useRef<SVGSVGElement>(null);
    const text = "Skybound Studio";
    const getLetterDelay = () => {
        const rand = Math.random();
        if (rand < 0.15) return 500;
        if (rand < 0.35) return 250;
        return 50 + Math.random() * 50;
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
                path.style.transition = "stroke-dashoffset 1.5s ease";
                path.style.strokeDashoffset = "0";
            });
        });
        setTimeout(() => {
            paths.forEach(path => {
                path.style.transition = "fill 0.5s ease";
                path.style.fill = "var(--mainTextColor)";
            });
            setTimeout(() => setLogoDrawn(true), 500);
        }, 2000);
    }, []);
    useEffect(() => {
        if (!logoDrawn) return;
        if (textIndex < text.length) {
            const letterTimer = setTimeout(() => setTextIndex(textIndex + 1), getLetterDelay());
            return () => clearTimeout(letterTimer);
        }
    }, [textIndex, logoDrawn]);
    useEffect(() => {
        if (textIndex === text.length) {
            const finalPause = 1000;
            const timer = setTimeout(() => setAnimateOut(true), finalPause);
            return () => clearTimeout(timer);
        }
    }, [textIndex]);
    useEffect(() => {
        if (animateOut) {
            const removeTimer = setTimeout(() => setVisible(false), 1000);
            return () => clearTimeout(removeTimer);
        }
    }, [animateOut]);
    if (!visible) return null;
    return (
        <div className={`preloader ${animateOut ? "out" : ""}`}>
            <Logo ref={logoRef} className="logo" />
            <div className="text" style={{ opacity: logoDrawn ? 1 : 0 }}>
                <span className="placeholder">{text}</span>
                <h2>{text.slice(0, textIndex)}</h2>
            </div>
        </div>
    );
}