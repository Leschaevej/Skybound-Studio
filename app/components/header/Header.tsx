'use client';

import { useState, useEffect, useRef } from 'react';
import "./Header.scss";
import { robotoSerif } from '../../font';
import Logo from '../../../app/assets/logo.svg';
import Menu from '../../../app/assets/menu.svg';

// Types pour les props du composant Header

interface HeaderProps {
  onHeightChange?: (height: number) => void; // Callback optionnel pour notifier la hauteur du header
}
// Constantes pour les sections de la page (évite les erreurs de frappe)
const SECTIONS = {
  HERO: 'hero',
  SERVICES: 'services',
  CONTACT: 'contact'
} as const;
// Type pour s'assurer qu'on utilise seulement les sections valides
type SectionId = typeof SECTIONS[keyof typeof SECTIONS];
// Composant principal du header avec navigation et menu mobile
export default function Header({ onHeightChange }: HeaderProps) {
    // États pour gérer l'affichage du header et du menu
    const [scrolled, setScrolled] = useState(false); // Header change d'apparence quand on scroll
    const [menuOpen, setMenuOpen] = useState(false); // Menu mobile ouvert/fermé
    // Références pour accéder aux éléments DOM
    const sideRef = useRef<HTMLDivElement>(null); // Menu latéral mobile
    const menuBtnRef = useRef<SVGSVGElement>(null); // Bouton hamburger
    const headerRef = useRef<HTMLElement>(null); // Header principal
    // Détecte le scroll pour changer l'apparence du header
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Vérifie l'état initial
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    // Ferme le menu mobile quand on scroll
    useEffect(() => {
        const handleScrollCloseMenu = () => {
            if (menuOpen) setMenuOpen(false);
        };
        window.addEventListener('scroll', handleScrollCloseMenu);
        return () => window.removeEventListener('scroll', handleScrollCloseMenu);
    }, [menuOpen]);
    // Fonction pour scroller vers une section en tenant compte de la hauteur du header
    const scrollToSection = (id: SectionId) => {
        const element = document.getElementById(id);
        if (element && headerRef.current) {
            const headerHeight = headerRef.current.getBoundingClientRect().height;
            const y = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({ top: y, behavior: 'smooth' }); // Animation de scroll fluide
        }
    };
    // Ferme le menu mobile si on clique en dehors
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
    // Met à jour la position du menu et notifie la hauteur du header
    useEffect(() => {
        const updateHeaderDimensions = () => {
            if (headerRef.current) {
                const headerHeight = headerRef.current.getBoundingClientRect().height;
                // Positionne le menu mobile juste sous le header
                if (sideRef.current) {
                    sideRef.current.style.top = `${headerHeight + 10}px`;
                }
                // Notifie le parent de la hauteur du header (pour ajuster le contenu)
                if (onHeightChange) {
                    onHeightChange(headerHeight);
                }
            }
        };
        updateHeaderDimensions();
        window.addEventListener('resize', updateHeaderDimensions); // Recalcule si la fenêtre change
        return () => window.removeEventListener('resize', updateHeaderDimensions);
    }, [onHeightChange]);
    // Liste des éléments de navigation
    const navigationItems = [
        { id: SECTIONS.HERO, label: 'Accueil' },
        { id: SECTIONS.SERVICES, label: 'Services' },
        { id: SECTIONS.CONTACT, label: 'Contact' }
    ];
    // Fonction appelée quand on clique sur un élément de navigation
    const handleNavClick = (sectionId: SectionId) => {
        scrollToSection(sectionId); // Va à la section
        setMenuOpen(false); // Ferme le menu mobile
    };
    return (
        <>
            {/* Header principal avec logo et bouton menu */}
            <header
                ref={headerRef}
                data-testid="header"
                className={scrolled ? 'header scrolled' : 'header'} // Classe CSS change selon le scroll
            >
                {/* Logo et nom de l'entreprise */}
                <div className="brand">
                    <Logo
                        data-testid="logo"
                        className="logo"
                        onClick={() => scrollToSection(SECTIONS.HERO)} // Clique sur le logo = retour à l'accueil
                    />
                    <h1 className={robotoSerif.className}>Skybound Studio</h1>
                </div>
                {/* Bouton hamburger pour ouvrir/fermer le menu mobile */}
                <Menu
                    ref={menuBtnRef}
                    data-testid="menu"
                    className="menu"
                    onClick={() => setMenuOpen(prev => !prev)} // Inverse l'état du menu
                    aria-label="Menu de navigation"
                    aria-expanded={menuOpen} // Indique aux lecteurs d'écran si le menu est ouvert
                    role="button"
                    tabIndex={0}
                />
            </header>
            {/* Menu mobile latéral */}
            <aside ref={sideRef} data-testid="side" className={`side ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
                <nav aria-label="Navigation principale">
                    <ul role="list">
                        {/* Génère les liens de navigation */}
                        {navigationItems.map((item) => (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }} // Empêche le comportement par défaut
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            {/* Overlay sombre quand le menu est ouvert */}
            {menuOpen && <div className="overlay"></div>}
        </>
    );
}