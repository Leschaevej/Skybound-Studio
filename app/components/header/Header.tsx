'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import "./Header.scss";
import { robotoSerif } from '../../font';
import Logo from '../../../app/assets/logo.svg';

const NAV_LINKS = [
    { id: 'hero', label: 'Accueil' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
];
export default function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

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

    const handleLogoClick = (e: React.MouseEvent) => {
        if (pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            sessionStorage.setItem('scrollTarget', 'hero');
        }
    };
    const handleNavClick = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
        if (pathname === '/') {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        } else {
            sessionStorage.setItem('scrollTarget', id);
            window.location.href = '/';
        }
    };
    return (
        <>
            <header>
                <Link href="/" className="brand" onClick={handleLogoClick}>
                    <Logo className="logo" aria-label="Retour à l'accueil" />
                    <h1 className={robotoSerif.className}>Skybound Studio</h1>
                </Link>
                <div className={`menu ${isOpen ? 'open' : ''}`} onClick={() => !isOpen && setIsOpen(true)}>
                    <span onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}>MENU</span>
                    <nav>
                        <div className="inner">
                            {NAV_LINKS.map(({ id, label }) => (
                                <a key={id} href={`/#${id}`} onClick={(e) => handleNavClick(e, id)}>
                                    {label}
                                </a>
                            ))}
                        </div>
                    </nav>
                </div>
            </header>
            {isOpen && <div className="backdrop" onClick={() => setIsOpen(false)} />}
        </>
    );
}