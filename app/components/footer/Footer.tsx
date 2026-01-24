'use client';

import './Footer.scss';
import { robotoSerif } from '../../font';
import Logo from '../../../app/assets/logo.svg';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer role="contentinfo" aria-label="Pied de page du site">
            <div className='brand'>
                <Logo
                    className="logo"
                    aria-label="Logo Skybound Studio"
                />
                <Link href="/legal" className="legal">
                    Légales
                </Link>
            </div>
            <p aria-label="Informations de copyright">
                <span className="copy">© 2026 by </span>
                <span className={`${robotoSerif.className} brand`}>Skybound Studio</span>
            </p>
        </footer>
    );
}