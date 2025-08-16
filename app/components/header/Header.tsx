'use client';

import { useState, useEffect, useRef } from 'react';
import "./Header.scss";
import { robotoSerif } from '../../font';
import Logo from '../../../app/assets/logo.svg';
import Menu from '../../../app/assets/menu.svg';

interface HeaderProps {
  onHeightChange?: (height: number) => void;
}

export default function Header({ onHeightChange }: HeaderProps) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const sideRef = useRef<HTMLDivElement>(null);
    const menuBtnRef = useRef<SVGSVGElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    useEffect(() => {
        const handleScrollCloseMenu = () => {
            if (menuOpen) setMenuOpen(false);
        };
        window.addEventListener('scroll', handleScrollCloseMenu);
        return () => window.removeEventListener('scroll', handleScrollCloseMenu);
    }, [menuOpen]);
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element && headerRef.current) {
            const headerHeight = headerRef.current.getBoundingClientRect().height;
            const y = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
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
    useEffect(() => {
        const updateSidePosition = () => {
            if (sideRef.current) {
                const header = headerRef.current;
                if (header) {
                    const headerHeight = header.getBoundingClientRect().height;
                    sideRef.current.style.top = `${headerHeight + 10}px`;
                }
            }
        };
        updateSidePosition();
        window.addEventListener('resize', updateSidePosition);
        return () => window.removeEventListener('resize', updateSidePosition);
    }, []);
    useEffect(() => {
        const updateHeight = () => {
            if (headerRef.current && onHeightChange) {
                onHeightChange(headerRef.current.getBoundingClientRect().height);
            }
        };
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, [onHeightChange]);
    return (
        <>
            <header
                ref={headerRef}
                data-testid="header"
                className={scrolled ? 'header scrolled' : 'header'}
            >
                <div className="brand">
                    <Logo
                        data-testid="logo"
                        className="logo"
                        onClick={() => scrollToSection('hero')}
                    />
                    <h1 className={robotoSerif.className}>Skybound Studio</h1>
                </div>
                <Menu
                    ref={menuBtnRef}
                    data-testid="menu"
                    className="menu"
                    onClick={() => setMenuOpen(prev => !prev)}
                />
            </header>
            <aside ref={sideRef} data-testid="side" className={`side ${menuOpen ? 'open' : ''}`}>
                <nav>
                    <ul>
                        <li>
                            <a
                                href="#hero"
                                onClick={(e) => { e.preventDefault(); scrollToSection('hero'); setMenuOpen(false); }}
                            >
                                Accueil
                            </a>
                        </li>
                        <li>
                            <a
                                href="#services"
                                onClick={(e) => { e.preventDefault(); scrollToSection('services'); setMenuOpen(false); }}
                            >
                                Services
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); setMenuOpen(false); }}
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
            {menuOpen && <div className="overlay"></div>}
        </>
    );
}