'use client';

import { robotoSerif } from "./font";
import "./page.scss";
import Radar from './assets/radar.svg';
import Fighter from './assets/fighter.svg';
import Tower from './assets/tower.svg';

export default function Home() {
    return (
        <main>
            <section className="hero">
                <div className="intro">
                    <h2>Propulsez votre présence digitale avec légèreté et précision.</h2>
                    <p>Studio créatif spécialisé en design et développement web.</p>
                </div>
                <div className="action">
                    <button>Services</button>
                    <button>Contact</button>
                </div>
            </section>
            <section className="dream">
                <h2 className={robotoSerif.className}>Transformez vos rêves en projets</h2>
                <div className="worker">
                    <p>Chaque projet est unique et mérite une attention personnalisée. Skybound Studio vous accompagne pour valoriser votre savoir-faire avec rigueur et passion.</p>
                    <img src="/worker1.webp" alt="Artisant" />
                </div>
                <div className="worker">
                    <img src="/worker2.webp" alt="Association" />
                    <p>De la conception à la réalisation, l’objectif est d’assurer une présence digitale claire, performante, et qui reflète pleinement votre identité.</p>
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
        </main>
    );
}
