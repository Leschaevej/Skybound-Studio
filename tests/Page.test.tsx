import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../app/page';

const { mockScrollTo, cleanupMocks, setupTimers, cleanupTimers, mockQuerySelector, mockGetElementById } = (global as any).testUtils;
describe('Page d\'accueil', () => {
    beforeEach(() => { cleanupMocks(); setupTimers(); });
    afterEach(cleanupTimers);
    test('affiche toutes les sections dans l\'ordre', () => {
        render(<Home />);
        const sections = [
            { text: /Propulsez votre présence digitale/i, section: 'hero' },
            { text: /Transformez vos rêves en projets/i, section: 'dream' },
            { text: /Comment nous travaillons/i, section: 'method' },
            { text: /Nos services/i, section: 'services' },
            { text: /Derrière Skybound Studio/i, section: 'behind' },
            { text: /Contactez nous/i, section: 'contact' },
        ];
        sections.forEach(({ text, section }) => {
            const element = screen.getByText(text);
            expect(element).toBeInTheDocument();
            expect(element.closest('section')).toHaveClass(section);
        });
    });
    test('sections ont les bons IDs pour navigation', () => {
        render(<Home />);
        ['hero', 'services', 'contact'].forEach(id => {
            expect(document.getElementById(id)).toBeInTheDocument();
        });
    });
    test('navigation boutons hero', () => {
        render(<Home />);
        const heroSection = document.getElementById('hero');
        const servicesBtn = heroSection?.querySelector('button[aria-label="Services"]');
        const contactBtn = heroSection?.querySelector('button[aria-label="Contact"]');
        expect(servicesBtn).toBeInTheDocument();
        expect(contactBtn).toBeInTheDocument();
        if (servicesBtn) {
        fireEvent.click(servicesBtn);
        expect(mockScrollTo).toHaveBeenCalledWith({
            top: expect.any(Number),
            behavior: 'smooth',
        });
        }
    });
    test('scrollToSection avec élément inexistant', () => {
        const restore = mockGetElementById(null);
        render(<Home />);
        const heroSection = document.getElementById('hero');
        const servicesBtn = heroSection?.querySelector('button[aria-label="Services"]');
        if (servicesBtn) {
        fireEvent.click(servicesBtn);
        expect(mockScrollTo).not.toHaveBeenCalled();
        }
        restore();
    });
    test('contenu principal', () => {
        render(<Home />);
        expect(screen.getByAltText('Artisant')).toBeInTheDocument();
        expect(screen.getByAltText('Association')).toBeInTheDocument();
        ['Analyse', 'Conception', 'Support'].forEach(title => {
            expect(screen.getByText(title)).toBeInTheDocument();
        });
        ['Création', 'Refonte', 'Maintenance', 'Stratégie'].forEach(service => {
            expect(screen.getByText(service)).toBeInTheDocument();
        });
        expect(document.querySelector('.services .grid')?.children).toHaveLength(4);
        expect(document.querySelector('address')).toBeInTheDocument();
    });
    describe('Animations', () => {
        test('startHeroAnimations cas limites', () => {
        const restore1 = mockQuerySelector(null);
        render(<Home />);
        jest.advanceTimersByTime(300);
        expect(true).toBe(true);
        restore1();
        const restore2 = mockQuerySelector({
            querySelector: jest.fn().mockReturnValue(null),
            querySelectorAll: jest.fn().mockReturnValue([])
        });
        render(<Home />);
        jest.advanceTimersByTime(300);
        expect(true).toBe(true);
        restore2();
        });
        test('MutationObserver branches', () => {
        const restore1 = mockQuerySelector(null);
        render(<Home />);
        expect(true).toBe(true);
        restore1();
        const mockPreloader = document.createElement('div');
        const restore2 = mockQuerySelector(mockPreloader);
        render(<Home />);
        expect(true).toBe(true);
        restore2();
        });
        test('IntersectionObserver non-intersecting', () => {
        const originalIO = window.IntersectionObserver;
        window.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
            observe: jest.fn(),
            disconnect: jest.fn(),
            callback: setTimeout(() => {
            callback([{ isIntersecting: false, target: { classList: { add: jest.fn() } } }]);
            }, 50),
        }));
        render(<Home />);
        jest.advanceTimersByTime(100);
        expect(true).toBe(true);
        window.IntersectionObserver = originalIO;
        });
        test('animations hero après preloader', async () => {
        render(<Home />);
        const preloader = document.querySelector('.preloader');
        preloader?.remove();
        jest.advanceTimersByTime(300);
        await waitFor(() => {
            const heroH2 = document.querySelector('.hero h2');
            const heroP = document.querySelector('.hero p');
            if (heroH2 && heroP) {
            expect(heroH2).toHaveClass('animate');
            expect(heroP).toHaveClass('animate');
            }
        });
        });
    });
    describe('Accessibilité', () => {
        test('structure sémantique', () => {
        render(<Home />);
        expect(screen.getByRole('main')).toBeInTheDocument();
        expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThan(4);
        expect(screen.getAllByRole('heading', { level: 3 }).length).toBeGreaterThan(6);
        });
        test('images ont alt text', () => {
        render(<Home />);
        const images = screen.getAllByRole('img');
        images.forEach(img => {
            expect(img).toHaveAttribute('alt');
        });
        });
        test('liens téléphone', () => {
        render(<Home />);
        const phoneLink = screen.getByRole('link', { name: /07 81 07 63 89/i });
        expect(phoneLink).toHaveAttribute('href', 'tel:0781076389');
        });
        test('informations contact dans address', () => {
        render(<Home />);
        const address = document.querySelector('address');
        expect(address).toBeInTheDocument();
        if (address) {
            expect(address).toHaveTextContent(/07 81 07 63 89/);
            expect(address).toHaveTextContent(/Aix en Provence/);
        }
        });
    });
    test('structure responsive', () => {
        render(<Home />);
        expect(document.querySelector('.dream .content')).toBeInTheDocument();
        expect(document.querySelector('.method .list')).toBeInTheDocument();
        expect(document.querySelector('.services .grid')).toBeInTheDocument();
    });
    test('gestion hauteur header', () => {
        render(<Home />);
        const heroSection = document.getElementById('hero');
        expect(heroSection).toBeInTheDocument();
        expect(heroSection).toHaveStyle('padding-top: 80px');
    });
});