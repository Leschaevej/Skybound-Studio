"use client";

import { useState, useEffect } from 'react';
import './Cookies.scss';

interface CookiePreferences {
    essential: boolean;
    analytics: boolean;
}
export default function Cookies() {
    const [showModal, setShowModal] = useState(false);
    const [isEntering, setIsEntering] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>({
        essential: true,
        analytics: true
    });
    const showModalWithAnimation = () => {
        setShowModal(true);
        setIsEntering(true);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setIsEntering(false);
            });
        });
    };
    const closeModalWithAnimation = () => {
        setIsExiting(true);
        setTimeout(() => {
            setShowModal(false);
            setShowContent(false);
            setIsExiting(false);
        }, 400);
    };
    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        const hasVisited = sessionStorage.getItem('hasVisited');
        if (consent) {
            try {
                const savedPreferences = JSON.parse(consent);
                const currentTime = Date.now();
                const thirteenMonthsInMs = 13 * 30 * 24 * 60 * 60 * 1000;
                if (savedPreferences.timestamp && (currentTime - savedPreferences.timestamp) > thirteenMonthsInMs) {
                    localStorage.removeItem('cookieConsent');
                    if (!hasVisited) {
                        setTimeout(() => showModalWithAnimation(), 1500);
                    } else {
                        setTimeout(() => showModalWithAnimation(), 100);
                    }
                } else {
                    setPreferences({
                        essential: savedPreferences.essential || true,
                        analytics: savedPreferences.analytics || false
                    });
                }
            } catch {
                localStorage.removeItem('cookieConsent');
                if (!hasVisited) {
                    setTimeout(() => showModalWithAnimation(), 1500);
                } else {
                    setTimeout(() => showModalWithAnimation(), 100);
                }
            }
        }
        if (!consent) {
            if (!hasVisited) {
                setTimeout(() => {
                    showModalWithAnimation();
                }, 1500);
            } else {
                setTimeout(() => {
                    showModalWithAnimation();
                }, 100);
            }
        }
        const handleOpenModal = (event: Event) => {
            showModalWithAnimation();
            const customEvent = event as CustomEvent;
            if (customEvent.detail?.mode === 'manage') {
                setShowContent(true);
            } else {
                setShowContent(false);
            }
        };
        window.addEventListener('openCookieModal', handleOpenModal);
        return () => {
            window.removeEventListener('openCookieModal', handleOpenModal);
        };
    }, []);
    const handleAcceptAll = () => {
        const consentData = {
            essential: true,
            analytics: true,
            timestamp: Date.now()
        };
        localStorage.setItem('cookieConsent', JSON.stringify(consentData));
        closeModalWithAnimation();
    };
    const handleAcceptMinimum = () => {
        const consentData = {
            essential: true,
            analytics: false,
            timestamp: Date.now()
        };
        localStorage.setItem('cookieConsent', JSON.stringify(consentData));
        closeModalWithAnimation();
    };
    const handleManage = () => {
        setShowContent(true);
    };
    const handleSavePreferences = () => {
        const consentData = {
            ...preferences,
            timestamp: Date.now()
        };
        localStorage.setItem('cookieConsent', JSON.stringify(consentData));
        closeModalWithAnimation();
    };
    return (
        <>
            {showModal && (
                <div className="overlay">
                    <div className={`modal ${isEntering ? 'entering' : ''} ${isExiting ? 'exiting' : ''}`}>
                        <div className="header">
                            <h2>Gestion des cookies</h2>
                            <p>Nous utilisons des cookies pour améliorer votre expérience et mesurer l&apos;audience.</p>
                        </div>
                        {showContent && (
                            <div className="content">
                            <div className="cookie">
                                <div className="top">
                                    <h3>Fonctionnel</h3>
                                    <div className="switch">
                                        <span className="text">Toujours actifs</span>
                                    </div>
                                </div>
                                <p>Cookies nécessaires au fonctionnement du site.</p>
                            </div>
                            <div className="cookie">
                                <div className="top">
                                    <h3>Statistiques</h3>
                                    <div className="switch">
                                        <span className="text">{preferences.analytics ? 'Activé' : 'Désactivé'}</span>
                                        <div 
                                            className={`toggle ${preferences.analytics ? 'enabled' : ''}`}
                                            onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                                        >
                                            <div className="dot"></div>
                                        </div>
                                    </div>
                                </div>
                                <p>Cookies pour analyser l&apos;audience du site.</p>
                            </div>
                            </div>
                        )}
                        <div className="actions">
                            {!showContent ? (
                                <>
                                    <button onClick={handleAcceptAll} className="accept">
                                        Accepter tout
                                    </button>
                                    <button onClick={handleAcceptMinimum} className="minimum">
                                        Accepter minimum
                                    </button>
                                    <button onClick={handleManage} className="manage">
                                        Gérer
                                    </button>
                                </>
                            ) : (
                                <button onClick={handleSavePreferences} className="save">
                                    Sauvegarder mes préférences
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}