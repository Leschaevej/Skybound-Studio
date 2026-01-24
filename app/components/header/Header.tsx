'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import "./Header.scss";
import { robotoSerif } from '../../font';
import Logo from '../../../app/assets/logo.svg';

interface HeaderProps {
    onHeightChange?: (height: number) => void;
}

const NAV_LINKS = [
    { id: 'hero', label: 'Accueil' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
];

export default function Header({ onHeightChange }: HeaderProps) {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (headerRef.current && onHeightChange) {
            onHeightChange(headerRef.current.getBoundingClientRect().height);
        }
    }, [onHeightChange]);

    const navigateToSection = (id: string) => {
        if (pathname === '/') {
            const element = document.getElementById(id);
            if (element && headerRef.current) {
                const headerHeight = headerRef.current.getBoundingClientRect().height;
                const y = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        } else {
            sessionStorage.setItem('scrollToSection', id);
            router.push('/');
        }
        setIsOpen(false);
    };

    const handleLogoClick = () => {
        if (pathname === '/') {
            navigateToSection('hero');
        } else {
            router.push('/');
        }
    };

    return (
        <>
            <header ref={headerRef} className={scrolled ? 'scrolled' : ''}>
                <div className="brand">
                    <Logo
                        className="logo"
                        onClick={handleLogoClick}
                        style={{ cursor: 'pointer' }}
                        aria-label="Retour à l'accueil"
                    />
                    <h1 className={robotoSerif.className}>Skybound Studio</h1>
                </div>
                <div className={`menu ${isOpen ? 'open' : ''}`}>
                    <button onClick={() => setIsOpen(!isOpen)}>MENU</button>
                    <nav>
                        <div className="inner">
                            {NAV_LINKS.map(({ id, label }) => (
                                <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); navigateToSection(id); }}>
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
