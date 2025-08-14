import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../app/page';

describe('Home page', () => {
    beforeEach(() => {
        render(<Home />);
    });

    test('affiche les sections principales', () => {
        const mainSections = [
            /Propulsez votre présence digitale/i,
            /Transformez vos rêves en projets/i,
            /Comment nous travaillons/i,
            /Nos services/i,
            /Derriere Skybound Studio/i,
            /Contactez nous/i
        ];

        mainSections.forEach((text) => {
            expect(screen.getByText(text)).toBeInTheDocument();
        });
    });

    test('les boutons du hero scrollent vers les sections', () => {
        const scrollToMock = jest.fn();
        window.scrollTo = scrollToMock;

        const servicesButton = screen.getByRole('button', { name: /Services/i });
        fireEvent.click(servicesButton);
        expect(scrollToMock).toHaveBeenCalled();

        const contactButton = screen.getByRole('button', { name: /Contact/i });
        fireEvent.click(contactButton);
        expect(scrollToMock).toHaveBeenCalledTimes(2);
    });

    test('les images ont bien un alt', () => {
        expect(screen.getByAltText('Artisant')).toBeInTheDocument();
        expect(screen.getByAltText('Association')).toBeInTheDocument();
    });

    test('les icônes SVG sont présentes', () => {
        const svgAltOrClass = ['radar', 'fighter', 'tower', 'create', 'refresh', 'wrench', 'strategy'];
        svgAltOrClass.forEach((cls) => {
            expect(document.querySelector(`.${cls}`)).toBeInTheDocument();
        });
    });

    test('les titres des articles Méthode sont corrects', () => {
        const methodTitles = ['Analyse', 'Conception', 'Support'];
        methodTitles.forEach((title) => {
            expect(screen.getByText(title)).toBeInTheDocument();
        });
    });

    test('les titres des services sont corrects', () => {
        const serviceTitles = ['Création', 'Refonte', 'Maintenance', 'Stratégie digitale'];
        serviceTitles.forEach((title) => {
            expect(screen.getByText(title)).toBeInTheDocument();
        });
    });

    test('la section Contact contient les infos', () => {
        expect(screen.getByText(/07 81 07 63 89/i)).toBeInTheDocument();
        expect(screen.getByText(/leschaeve.jimmy@gmail.com/i)).toBeInTheDocument();
        expect(screen.getByText(/Aix en Provence 13100/i)).toBeInTheDocument();
    });
});
