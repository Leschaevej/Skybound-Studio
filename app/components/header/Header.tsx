'use client';

import { useState, useEffect, useRef } from 'react';
import "./Header.scss";
import { robotoSerif } from '../../font';
import Logo from '../../../app/assets/logo.svg';
import Menu from '../../../app/assets/menu.svg';

interface HeaderProps {
  onHeightChange?: (height: number) => void;
}
const SECTIONS = {
  HERO: 'hero',
  SERVICES: 'services',
  CONTACT: 'contact'
} as const;
type SectionId = typeof SECTIONS[keyof typeof SECTIONS];
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
    const scrollToSection = (id: SectionId) => {
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
        const updateHeaderDimensions = () => {
            if (headerRef.current) {
                const headerHeight = headerRef.current.getBoundingClientRect().height;
                if (sideRef.current) {
                    sideRef.current.style.top = `${headerHeight + 10}px`;
                }
                if (onHeightChange) {
                    onHeightChange(headerHeight);
                }
            }
        };
        updateHeaderDimensions();
        window.addEventListener('resize', updateHeaderDimensions);
        return () => window.removeEventListener('resize', updateHeaderDimensions);
    }, [onHeightChange]);
    const navigationItems = [
        { id: SECTIONS.HERO, label: 'Accueil' },
        { id: SECTIONS.SERVICES, label: 'Services' },
        { id: SECTIONS.CONTACT, label: 'Contact' }
    ];
    const handleNavClick = (sectionId: SectionId) => {
        scrollToSection(sectionId);
        setMenuOpen(false);
    };
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
                        onClick={() => scrollToSection(SECTIONS.HERO)}
                    />
                    <h1 className={robotoSerif.className}>Skybound Studio</h1>
                </div>
                <Menu
                    ref={menuBtnRef}
                    data-testid="menu"
                    className="menu"
                    onClick={() => setMenuOpen(prev => !prev)}
                    aria-label="Menu de navigation"
                    aria-expanded={menuOpen}
                    role="button"
                    tabIndex={0}
                />
            </header>
            <aside ref={sideRef} data-testid="side" className={`side ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
                <nav aria-label="Navigation principale">
                    <ul role="list">
                        {navigationItems.map((item) => (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            {menuOpen && <div className="overlay"></div>}
        </>
    );
}