'use client';

import { useState, useEffect, useRef } from 'react';
import "./Header.scss";
import { robotoSerif } from '../../font';
import Logo from '../../../app/assets/logo.svg';
import Menu from '../../../app/assets/menu.svg';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const sideRef = useRef<HTMLDivElement>(null);
    const menuBtnRef = useRef<SVGSVGElement>(null);
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const isMobile = window.innerWidth <= 767;
            const yOffset = isMobile ? -50 : -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuOpen &&
                sideRef.current &&
                !sideRef.current.contains(event.target as Node) &&
                menuBtnRef.current &&
                !menuBtnRef.current.contains(event.target as Node)
            ) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);
    return (
        <>
            <header data-testid="header" className={scrolled ? 'header scrolled' : 'header'}>
                <div className="brand">
                    <Logo data-testid="logo" className="logo" />
                    <h1 className={robotoSerif.className}>Skybound Studio</h1>
                </div>
                <Menu
                    ref={menuBtnRef}
                    data-testid="menu-button"
                    className="menu"
                    onClick={() => setMenuOpen(prev => !prev)}
                />
            </header>
            <aside ref={sideRef} data-testid="side" className={`side ${menuOpen ? 'open' : ''}`}>
                <nav>
                    <ul>
                        <li>
                            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); setMenuOpen(false); }}>Accueil</a>
                        </li>
                        <li>
                            <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); setMenuOpen(false); }}>Services</a>
                        </li>
                        <li>
                            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); setMenuOpen(false); }}>Contact</a>
                        </li>
                    </ul>
                </nav>
            </aside>
            {menuOpen && <div className="overlay"></div>}
        </>
    );
}