'use client';

import { useEffect } from 'react';

export default function Animations() {
    useEffect(() => {
        const scrollTarget = sessionStorage.getItem('scrollTarget');
        if (scrollTarget) {
            sessionStorage.removeItem('scrollTarget');
            window.scrollTo({ top: 0, behavior: 'instant' });
            if (scrollTarget !== 'hero') {
                setTimeout(() => {
                    document.getElementById(scrollTarget)?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, []);

    useEffect(() => {
        const observerOptions = { threshold: 0.80 };
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        };
        const intersectionObserver = new IntersectionObserver(handleIntersection, observerOptions);
        const elementsToAnimate = document.querySelectorAll('h2:not(.hero h2):not(.preloader h2), .dream .wrapper, .dream figcaption, .method h3, .method svg, .method p, .services svg, .services h3, .services p, .behind p, .contact .content > p, .contact .details h3, .contact .details p, .contact .panel > :not(.details)');
        elementsToAnimate.forEach(element => {
            intersectionObserver.observe(element);
        });
        return () => intersectionObserver.disconnect();
    }, []);

    return null;
}
