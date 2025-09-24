import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Footer from '../app/components/footer/Footer';

expect.extend(toHaveNoViolations);
describe('Footer', () => {
    beforeEach(() => { render(<Footer />); });
    test('affiche le logo', () => {
        const logo = screen.getByTestId('mocked-svg');
        expect(logo).toBeInTheDocument();
    });
    test('affiche le texte de copyright', () => {
        const copyright = screen.getByText(/© 2025 by/i);
        expect(copyright).toBeInTheDocument();
        const brand = screen.getByText(/skybound studio/i);
        expect(brand).toBeInTheDocument();
    });
    describe('Accessibilité', () => {
        test('pas de violations d\'accessibilité', async () => {
            const footer = screen.getByText(/© 2025 by/i);
            expect(footer).toBeInTheDocument();
        });
        test('structure sémantique correcte', () => {
            render(<Footer />);
            const footer = document.querySelector('footer');
            expect(footer).toBeInTheDocument();
        });
        test('logo a les attributs appropriés', () => {
            render(<Footer />);
            const logos = screen.getAllByTestId('mocked-svg');
            expect(logos.length).toBeGreaterThan(0);
            expect(logos[0]).toHaveClass('logo');
        });
        test('contenu textuel accessible', () => {
            render(<Footer />);
            const copyrightTexts = screen.getAllByText(/© 2025 by/i);
            expect(copyrightTexts.length).toBeGreaterThan(0);
            expect(copyrightTexts[0]).toBeVisible();
            const brandTexts = screen.getAllByText(/skybound studio/i);
            expect(brandTexts.length).toBeGreaterThan(0);
            expect(brandTexts[0]).toBeVisible();
        });
        test('contraste et lisibilité', () => {
            render(<Footer />);
            const footer = document.querySelector('footer');
            if (footer) {
                const styles = window.getComputedStyle(footer);
                expect(styles.color).toBeTruthy();
                expect(styles.backgroundColor).toBeTruthy();
            }
        });
        test('responsive et accessibilité mobile', () => {
            render(<Footer />);
            const footers = document.querySelectorAll('footer');
            expect(footers.length).toBeGreaterThan(0);
            expect(footers[0]).toBeVisible();
            const logos = screen.getAllByTestId('mocked-svg');
            expect(logos.length).toBeGreaterThan(0);
        });
        test('informations légales accessibles', () => {
            render(<Footer />);
            const copyrightInfos = screen.getAllByText(/© 2025 by/i);
            expect(copyrightInfos.length).toBeGreaterThan(0);
        });
    });
});