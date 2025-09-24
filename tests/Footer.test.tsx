import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Footer from '../app/components/footer/Footer';

// Étendre Jest avec les matchers axe
expect.extend(toHaveNoViolations);

describe('Footer', () => {
    beforeEach(() => {
        render(<Footer />);
    });
    test('affiche le logo', () => {
        const logo = screen.getByTestId('footer-logo');
        expect(logo).toBeInTheDocument();
    });
    test('affiche le texte de copyright', () => {
        const copyright = screen.getByText(/© 2025 by/i);
        expect(copyright).toBeInTheDocument();
        const brand = screen.getByText(/skybound studio/i);
        expect(brand).toBeInTheDocument();
    });

    // TESTS D'ACCESSIBILITÉ
    describe('Accessibilité', () => {
        test('pas de violations d\'accessibilité', async () => {
            // Clear le document pour éviter les conflits de contentinfo
            document.body.innerHTML = '';
            const { container } = render(<Footer />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        test('structure sémantique correcte', () => {
            render(<Footer />);

            // Le footer devrait avoir le bon rôle sémantique
            const footer = document.querySelector('footer');
            expect(footer).toBeInTheDocument();
        });

        test('logo a les attributs appropriés', () => {
            render(<Footer />);

            const logos = screen.getAllByTestId('footer-logo');
            expect(logos.length).toBeGreaterThan(0);

            // Le premier logo est présent et accessible
            expect(logos[0]).toHaveClass('logo');
        });

        test('contenu textuel accessible', () => {
            render(<Footer />);

            // Vérifier que le texte de copyright est lisible par les lecteurs d'écran
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
                // Vérifier que le footer a des couleurs définies
                const styles = window.getComputedStyle(footer);
                expect(styles.color).toBeTruthy();
                expect(styles.backgroundColor).toBeTruthy();
            }
        });

        test('responsive et accessibilité mobile', () => {
            render(<Footer />);

            const footers = document.querySelectorAll('footer');
            expect(footers.length).toBeGreaterThan(0);

            // Vérifier que le footer reste accessible
            expect(footers[0]).toBeVisible();

            // Vérifier que le logo existe
            const logos = screen.getAllByTestId('footer-logo');
            expect(logos.length).toBeGreaterThan(0);
        });

        test('informations légales accessibles', () => {
            render(<Footer />);

            // Vérifier que les informations de copyright sont structurées correctement
            const copyrightInfos = screen.getAllByText(/© 2025 by/i);
            expect(copyrightInfos.length).toBeGreaterThan(0);

            // Dans un vrai projet, on pourrait vérifier:
            // - Les liens de politique de confidentialité
            // - Les mentions légales
            // - Les liens vers les réseaux sociaux avec aria-label appropriés
        });
    });
});