'use client';
import { useState, useEffect } from 'react';
import "./Header.scss";
import { robotoSerif } from '../../font';
import Logo from '../../../app/assets/logo.svg';
import Menu from '../../../app/assets/menu.svg';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={scrolled ? 'header scrolled' : 'header'}>
        <div className="brand">
            <Logo className="logo" />
            <h1 className={robotoSerif.className} >Skybound Studio</h1>
        </div>
        <Menu className="menu"/>
    </header>
  )
}
