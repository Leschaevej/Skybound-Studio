'use client';

import "./Footer.scss";
import { robotoSerif } from '../../font';
import Logo from '../../../app/assets/logo.svg';

export default function Footer() {
  return (
    <footer>
        <Logo className="logo" data-testid="footer-logo" />
        <p>
            <span className="copy">© 2025 by </span>
            <span className={`${robotoSerif.className} brand`}>Skybound Studio</span>
        </p>
    </footer>
  )
}