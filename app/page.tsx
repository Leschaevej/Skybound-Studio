'use client';

import Image from "next/image";
import { robotoSerif } from "./font";
import "./page.scss";
import Radar from './assets/radar.svg';
import Fighter from './assets/fighter.svg';
import Tower from './assets/tower.svg';
import Create from './assets/create.svg';
import Refresh from './assets/refresh.svg';
import Strategy from './assets/strategy.svg';
import Wrench from './assets/wrench.svg';

export default function Home() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const isMobile = window.innerWidth <= 767;
            const yOffset = isMobile ? -50 : -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };
    return (
        <main>
            <section id="hero" className="hero">
                <div className="intro">
                    <h2>Propulsez votre présence digitale avec légèreté et précision.</h2>
                    <p>Studio créatif spécialisé en design et développement web.</p>
                </div>
                <div className="action">
                    <button onClick={() => scrollToSection('services')}>Services</button>
                    <button onClick={() => scrollToSection('contact')}>Contact</button>
                </div>
            </section>
            <section className="dream">
                <h2 className={robotoSerif.className}>Transformez vos rêves en projets</h2>
                <div className="content">
                    <div className="worker">
                        <p>Chaque projet est unique et mérite une attention personnalisée. Skybound Studio vous accompagne pour valoriser votre savoir-faire avec rigueur et passion.</p>
                        <Image src="/worker1.webp" alt="Artisant" width={500} height={500} style={{ width: "100%", height: "auto" }} />
                    </div>
                    <div className="worker">
                        <Image src="/worker2.webp" alt="Association" width={500} height={500} style={{ width: "100%", height: "auto" }} />
                        <p>De la conception à la réalisation, l’objectif est d’assurer une présence digitale claire, performante, et qui reflète pleinement votre identité.</p>
                    </div>
                </div>
            </section>
            <section className="method">
                <h2 className={robotoSerif.className}>Comment nous travaillons</h2>
                <div className="list">
                    <div className="column">
                        <Radar className="radar" />
                        <h3>Analyse</h3>
                        <p>Chaque projet débute par une écoute attentive des besoins et des objectifs. Comprendre l’essence de l’activité et ses spécificités permet de poser des bases solides et de définir des solutions adaptées et efficaces.</p>
                    </div>
                    <div className="column">
                        <Fighter className="fighter" />
                        <h3>Conception</h3>
                        <p>Conception de designs modernes, clairs et ergonomiques, pensés pour valoriser chaque projet. Développement de sites web sur-mesure, multiplateforme et optimisés, offrant une expérience utilisateur fluide et agréable.</p>
                    </div>
                    <div className="column">
                        <Tower className="tower" />
                        <h3>Support</h3>
                        <p>Un suivi personnalisé tout au long du projet, avec une assistance pour répondre aux questions, ajuster les solutions et assurer une évolution conforme aux besoins. La réussite du projet est une priorité.</p>
                    </div>
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
                <h2 className={robotoSerif.className}>Derriere Sybound Studio</h2>
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
                    <p>Nous sommes convaincus que votre entreprise est exceptionnelle, ou que vous avez une idée géniale ! Nous sommes impatients d&apos;en apprendre davantage afin de vous soutenir pleinement dans son développement.</p>
                    <div className="panel">
                        <div className="details">
                            <h3>N’hésitez pas</h3>
                            <p>07 81 07 63 89</p>
                            <p>contact@skyboundstudio.fr</p>
                            <p>1 Bis Cour D&apos;orbitelle<br/>Aix en Provence 13100</p>
                        </div>
                        <form className="form">
                            <div>
                                <label htmlFor="name">Nom</label>
                                <input type="text" id="name" name="name" required />
                            </div>

                            <div>
                                <label htmlFor="email">E-mail</label>
                                <input type="email" id="email" name="email" required />
                            </div>

                            <div>
                                <label htmlFor="phone">Téléphone</label>
                                <input type="tel" id="phone" name="phone" />
                            </div>

                            <div>
                                <label htmlFor="message">Message</label>
                                <textarea id="message" name="message" required></textarea>
                            </div>
                            <button type="submit">Envoyer</button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
