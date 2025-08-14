import { render, screen } from '@testing-library/react';
import Footer from '../app/components/footer/Footer';

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
});