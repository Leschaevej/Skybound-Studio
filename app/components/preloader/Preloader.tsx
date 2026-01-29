"use client";

import { useEffect, useState, useRef } from "react";
import "./Preloader.scss";
import Logo from '../../assets/logo.svg';
import { robotoSerif } from '../../font';

const animationDuration = 1000;
const slideDelay = 1500;

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
            const progress = Math.min((now - start) / animationDuration, 1);
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
        setTextVisible(true);
        requestAnimationFrame(animate);

        const fillTimer = setTimeout(() => {
            setFill(true);
        }, animationDuration);

        const slideTimer = setTimeout(() => {
            setSlideUp(true);
            setTimeout(() => {
                setHidden(true);
                sessionStorage.setItem('preloader-seen', 'true');
            }, slideDelay);
        }, animationDuration + slideDelay);

        return () => {
            clearTimeout(fillTimer);
            clearTimeout(slideTimer);
        };
    }, [checked, hidden]);

    useEffect(() => {
        if (!textVisible) return;
        if (textIndex < text.length) {
            const timer = setTimeout(() => setTextIndex(textIndex + 1), animationDuration / text.length);
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
            <div className={`text ${robotoSerif.className}`} style={{ opacity: textVisible ? 1 : 0 }}>
                <span className="placeholder" aria-hidden="true">{text}</span>
                <span className="typing">
                    {text.slice(0, textIndex)}
                </span>
            </div>
        </div>
    );
}
