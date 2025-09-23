'use client';

import Image from "next/image";
import { robotoSerif } from "./font";
import "./page.scss";
import { useState, useEffect } from 'react';
import Contact from "./components/contact/Contact";
import Radar from './assets/radar.svg';
import Fighter from './assets/fighter.svg';
import Tower from './assets/tower.svg';
import Create from './assets/create.svg';
import Refresh from './assets/refresh.svg';
import Strategy from './assets/strategy.svg';
import Wrench from './assets/wrench.svg';
import Header from "./components/header/Header";

export default function Home() {
    const [headerHeight, setHeaderHeight] = useState(0);
    const [preloaderComplete, setPreloaderComplete] = useState(false);
    const startHeroAnimations = () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            const h2 = hero.querySelector('h2');
            const p = hero.querySelector('p');
            const buttons = hero.querySelectorAll('button');
            h2?.classList.add('animate');
            p?.classList.add('animate');
            buttons.forEach(btn => btn.classList.add('animate-frame'));
            setTimeout(() => {
                buttons.forEach(btn => btn.classList.add('animate-text'));
            }, 600);
        }
    };

    useEffect(() => {
        if (preloaderComplete) {
            const timer = setTimeout(startHeroAnimations, 200);
            return () => clearTimeout(timer);
        }
    }, [preloaderComplete]);
    useEffect(() => {
        const checkPreloader = () => {
            const preloaderEl = document.querySelector('.preloader');
            if (!preloaderEl) {
                setPreloaderComplete(true);
            }
        };
        const observer = new MutationObserver(checkPreloader);
        observer.observe(document.body, { childList: true, subtree: true });
        checkPreloader();
        return () => observer.disconnect();
    }, []);
    useEffect(() => {
        const observerOptions = {
            threshold: 1.0,
        };
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        };
        const intersectionObserver = new IntersectionObserver(handleIntersection, observerOptions);
        const elementsToAnimate = document.querySelectorAll('h2:not(.hero h2):not(.preloader h2), .dream .wrapper, .dream figcaption, .method h3, .method svg, .method p, .services svg, .services h3, .services p, .behind p, .contact .content > p, .contact .details h3, .contact .details p, .contact .panel > :not(.details)');
        elementsToAnimate.forEach(element => {
            intersectionObserver.observe(element);
        });
        return () => intersectionObserver.disconnect();
    }, []);
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const y = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };
    return (
        <>
            <Header onHeightChange={setHeaderHeight} />
            <main>
                <section
                    id="hero"
                    className="hero"
                    style={{ 
                        paddingTop: `${headerHeight}px`,
                        paddingBottom: `${headerHeight}px`
                    }}
                >
                    <div className="intro">
                        <h2>Propulsez votre présence digitale avec légèreté et précision.</h2>
                        <p>Studio créatif spécialisé en design et développement web.</p>
                    </div>
                    <div className="action">
                        <button aria-label="Services" onClick={() => scrollToSection('services')}>Services</button>
                        <button aria-label="Contact" onClick={() => scrollToSection('contact')}>Contact</button>
                    </div>
                </section>
                <section className="dream">
                    <h2 className={robotoSerif.className}>Transformez vos rêves en projets</h2>
                    <div className="content">
                        <figure className="worker">
                            <figcaption>
                                Chaque projet est unique et mérite une attention personnalisée. Skybound Studio vous accompagne pour valoriser votre savoir-faire avec rigueur et passion.
                            </figcaption>
                            <div className="wrapper">
                                <Image src="/worker1.webp" alt="Artisant" fill priority sizes="(max-width: 767px) 100vw, 50vw" className="image" />
                            </div>
                        </figure>
                        <figure className="worker">
                            <div className="wrapper">
                                <Image src="/worker2.webp" alt="Association" fill priority sizes="(max-width: 767px) 100vw, 50vw" className="image" />
                            </div>
                            <figcaption>
                                De la conception à la réalisation, l’objectif est d’assurer une présence digitale claire, performante, et qui reflète pleinement votre identité.
                            </figcaption>
                        </figure>
                    </div>
                </section>
                <section className="method">
                    <h2 className={robotoSerif.className}>Comment nous travaillons</h2>
                    <div className="list">
                        <article className="column">
                            <Radar className="radar" />
                            <h3>Analyse</h3>
                            <p>Chaque projet débute par une écoute attentive des besoins et des objectifs. Comprendre l’essence de l’activité et ses spécificités permet de poser des bases solides et de définir des solutions adaptées et efficaces.</p>
                        </article>
                        <article className="column">
                            <Fighter className="fighter" />
                            <h3>Conception</h3>
                            <p>Conception de designs modernes, clairs et ergonomiques, pensés pour valoriser chaque projet. Développement de sites web sur-mesure, multiplateforme et optimisés, offrant une expérience utilisateur fluide et agréable.</p>
                        </article>
                        <article className="column">
                            <Tower className="tower" />
                            <h3>Support</h3>
                            <p>Un suivi personnalisé tout au long du projet, avec une assistance pour répondre aux questions, ajuster les solutions et assurer une évolution conforme aux besoins. La réussite du projet est une priorité.</p>
                        </article>
                    </div>
                </section>
                <section id="services" className="services">
                    <h2 className={robotoSerif.className}>Nos services</h2>
                    <div className="grid">
                        <div>
                            <Create className="create"/>
                            <h3>Création</h3>
                            <p>Sites vitrines, portfolios, boutiques en ligne adaptés à votre activité.</p>
                        </div>
                        <div>
                            <Refresh className="refresh"/>
                            <h3>Refonte</h3>
                            <p>Amélioration de sites existants pour une meilleure performance et visibilité.</p>
                        </div>
                        <div>
                            <Wrench className="wrench"/>
                            <h3>Maintenance</h3>
                            <p>Mises à jour, assistance technique et suivi régulier.</p>
                        </div>
                        <div>
                            <Strategy className="strategy"/>
                            <h3>Stratégie digitale</h3>
                            <p>Conseils personnalisés pour booster votre présence en ligne.</p>
                        </div>
                    </div>
                </section>
                <section className="behind">
                    <h2 className={robotoSerif.className}>Derrière Skybound Studio</h2>
                    <div className="content">
                        <p>Skybound Studio est l’alliance entre créativité, précision et écoute.</p>
                        <p>Le studio conçoit des sites web modernes et sur-mesure pour indépendants, artisans et petites entreprises.</p>
                        <p>Chaque projet est une nouvelle trajectoire : un accompagnement complet, de l’analyse à la mise en ligne, avec une approche claire, structurée et toujours centrée sur les objectifs du client.</p>
                        <p>Notre but ? Faire décoller la présence en ligne avec un site performant, unique et prêt à évoluer.</p>
                    </div>
                </section>
                <section id="contact" className="contact">
                    <h2 className={robotoSerif.className}>Contactez nous</h2>
                    <div className="content">
                        <p>Nous sommes convaincus que votre entreprise est exceptionnelle...</p>
                        <div className="panel">
                            <address className="details">
                                <h3>N&apos;hésitez pas</h3>
                                <p><a href="tel:0781076389">07 81 07 63 89</a></p>
                                <p>leschaeve.jimmy@gmail.com</p>
                                <p>1 Bis Cour D&apos;orbitelle<br/>Aix en Provence 13100</p>
                            </address>
                            <Contact />
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}