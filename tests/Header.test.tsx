import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../app/components/header/Header';

describe('Header', () => {
    beforeEach(() => {
        render(<Header />);
    });
    test('affiche le logo et le titre', () => {
        const logo = screen.getByTestId('logo');
        expect(logo).toBeInTheDocument();
        const title = screen.getByText(/skybound studio/i);
        expect(title).toBeInTheDocument();
    });
    test('menu s’ouvre et se ferme au clic', () => {
        const menuButton = screen.getByTestId('menu-button');
        const side = screen.getByTestId('side');
        expect(side).not.toHaveClass('open');
        fireEvent.click(menuButton);
        expect(side).toHaveClass('open');
        fireEvent.click(menuButton);
        expect(side).not.toHaveClass('open');
    });
    test('ferme le menu si on clique en dehors', () => {
        const menuButton = screen.getByTestId('menu-button');
        fireEvent.click(menuButton);
        const side = screen.getByTestId('side');
        expect(side).toHaveClass('open');
        fireEvent.mouseDown(document);
        expect(side).not.toHaveClass('open');
    });
    test('scroll ajoute la classe scrolled', () => {
        const header = screen.getByTestId('header');
        window.scrollY = 100;
        fireEvent.scroll(window);
        expect(header).toHaveClass('scrolled');
    });
});