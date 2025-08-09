'use client';
import "./Header.scss";
import { robotoSerif } from '../../font';
import Logo from '../../../app/assets/logo.svg';
import Menu from '../../../app/assets/menu.svg';

export default function Header() {
  return (
    <header>
        <div className="brand">
            <Logo className="logo" />
            <h1 className={robotoSerif.className} >Skybound Studio</h1>
        </div>
        <Menu className="menu"/>
    </header>
  )
}