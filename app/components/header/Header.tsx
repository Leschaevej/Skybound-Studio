'use client';

import { useState } from 'react';
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