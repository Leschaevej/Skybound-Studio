'use client';

import './Footer.scss';
import { robotoSerif } from '../../font';
import Logo from '../../../app/assets/logo.svg';

export default function Footer() {
    return (
        <footer role="contentinfo" aria-label="Pied de page du site">
            <Logo
                className="logo"
                data-testid="footer-logo"
                aria-label="Logo Skybound Studio"
            />
            <p aria-label="Informations de copyright">
                <span className="copy">© 2025 by </span>
                <span className={`${robotoSerif.className} brand`}>Skybound Studio</span>
            </p>
        </footer>
    );
}