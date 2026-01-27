"use client";

import { useEffect, useState, useRef } from "react";
import "./Preloader.scss";
import Logo from '../../assets/logo.svg';

const drawDuration = 1500;
const textDelay = 500;
const slideDelay = 1000;

export default function Preloader() {
    const [drawing, setDrawing] = useState(false);
    const [fill, setFill] = useState(false);
    const [slideUp, setSlideUp] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [checked, setChecked] = useState(false);
    const [textIndex, setTextIndex] = useState(0);
    const [textVisible, setTextVisible] = useState(false);
    const logoRef = useRef<SVGSVGElement>(null);

    const text = "Skybound Studio";

    useEffect(() => {
        if (sessionStorage.getItem('preloader-seen') === 'true') {
            setHidden(true);
        }
        setChecked(true);
    }, []);

    useEffect(() => {
        if (!checked || hidden) return;
        const logoEl = logoRef.current;
        if (!logoEl) return;
        const paths = Array.from(logoEl.querySelectorAll('path')) as SVGPathElement[];
        if (!paths.length) return;

        const start = performance.now();
        const animate = (now: number) => {
            const progress = Math.min((now - start) / drawDuration, 1);
            paths.forEach(path => {
                const length = path.getTotalLength();
                path.style.strokeDasharray = `${length}`;
                path.style.strokeDashoffset = `${length * (1 - progress)}`;
            });
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        setDrawing(true);
        requestAnimationFrame(animate);

        const fillTimer = setTimeout(() => {
            setFill(true);
            setTextVisible(true);
        }, drawDuration);

        const slideTimer = setTimeout(() => {
            setSlideUp(true);
            setTimeout(() => {
                setHidden(true);
                sessionStorage.setItem('preloader-seen', 'true');
            }, slideDelay);
        }, drawDuration + textDelay + text.length * 50 + slideDelay);

        return () => {
            clearTimeout(fillTimer);
            clearTimeout(slideTimer);
        };
    }, [checked, hidden]);

    useEffect(() => {
        if (!textVisible) return;
        if (textIndex < text.length) {
            const timer = setTimeout(() => setTextIndex(textIndex + 1), 50);
            return () => clearTimeout(timer);
        }
    }, [textIndex, textVisible]);

    if (hidden) return null;

    return (
        <div className={`preloader ${slideUp ? "out" : ""}`}>
            <Logo
                ref={logoRef}
                className={`logo ${drawing ? "drawing" : ""} ${fill ? "filled" : ""}`}
                aria-hidden="true"
            />
            <div className="text" style={{ opacity: textVisible ? 1 : 0 }}>
                <span className="placeholder" aria-hidden="true">{text}</span>
                <h2>
                    {text.slice(0, textIndex)}
                </h2>
            </div>
        </div>
    );
}
