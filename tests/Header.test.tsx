import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from '../app/components/header/Header';

const { mockScrollTo, cleanupMocks, mockGetElementById } = (global as any).testUtils;
describe('Header', () => {
    const mockOnHeightChange = jest.fn();
    beforeEach(() => {
        cleanupMocks();
        mockOnHeightChange.mockClear();
    });
    test('affiche logo et titre', () => {
        render(<Header onHeightChange={mockOnHeightChange} />);
        expect(screen.getAllByTestId('mocked-svg')[0]).toBeInTheDocument();
        expect(screen.getByText(/skybound studio/i)).toBeInTheDocument();
    });
    test('menu toggle', () => {
        render(<Header />);
        const menuBtn = screen.getAllByTestId('mocked-svg')[1];
        const side = screen.getByTestId('side');
        expect(side).not.toHaveClass('open');
        expect(side).toHaveAttribute('inert');
        fireEvent.click(menuBtn);
        expect(side).toHaveClass('open');
        expect(side).not.toHaveAttribute('inert');
        fireEvent.click(menuBtn);
        expect(side).not.toHaveClass('open');
    });
    test('ferme menu au scroll', () => {
        render(<Header />);
        const menuBtn = screen.getAllByTestId('mocked-svg')[1];
        const side = screen.getByTestId('side');
        fireEvent.click(menuBtn);
        expect(side).toHaveClass('open');
        fireEvent.scroll(window);
        expect(side).not.toHaveClass('open');
    });
    test('ferme menu clic dehors', async () => {
        render(<Header />);
        const menuBtn = screen.getAllByTestId('mocked-svg')[1];
        const side = screen.getByTestId('side');
        fireEvent.click(menuBtn);
        fireEvent.mouseDown(document.body);
        await waitFor(() => expect(side).not.toHaveClass('open'));
    });
    test('classe scrolled', () => {
        render(<Header />);
        const header = screen.getByTestId('header');
        expect(header).not.toHaveClass('scrolled');
        Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
        fireEvent.scroll(window);
        expect(header).toHaveClass('scrolled');
    });
    test('navigation liens', () => {
        render(<Header />);
        fireEvent.click(screen.getAllByTestId('mocked-svg')[1]);
        const accueilLink = screen.getByText('Accueil');
        fireEvent.click(accueilLink);
        expect(mockScrollTo).toHaveBeenCalled();
        const logo = screen.getAllByTestId('mocked-svg')[0];
        fireEvent.click(logo);
        expect(mockScrollTo).toHaveBeenCalledTimes(2);
    });
    test('scrollToSection sans élément', () => {
        const restore = mockGetElementById(null);
        render(<Header />);
        const logo = screen.getAllByTestId('mocked-svg')[0];
        fireEvent.click(logo);
        expect(mockScrollTo).not.toHaveBeenCalled();
        restore();
    });
    test('onHeightChange callback', () => {
        render(<Header onHeightChange={mockOnHeightChange} />);
        expect(mockOnHeightChange).toHaveBeenCalledWith(80);
        fireEvent(window, new Event('resize'));
        expect(mockOnHeightChange).toHaveBeenCalledTimes(2);
    });
    test('cas limites clickOutside', () => {
        render(<Header />);
        const side = screen.getByTestId('side');
        const el = document.createElement('div');
        document.body.appendChild(el);
        fireEvent.mouseDown(el);
        expect(side).not.toHaveClass('open');
        document.body.removeChild(el);
        fireEvent.click(screen.getAllByTestId('mocked-svg')[1]);
        expect(side).toHaveClass('open');
        fireEvent.mouseDown(el);
    });
    describe('Accessibilité', () => {
        test('attributs ARIA', () => {
        render(<Header />);
        const menuBtn = screen.getAllByTestId('mocked-svg')[1];
        expect(menuBtn).toHaveAttribute('aria-label', 'Menu de navigation');
        expect(menuBtn).toHaveAttribute('role', 'button');
        expect(menuBtn).toHaveAttribute('aria-expanded');
        fireEvent.click(menuBtn);
        expect(screen.getByTestId('side')).toHaveClass('open');
        });
        test('navigation clavier', () => {
        render(<Header />);
        const menuBtn = screen.getAllByTestId('mocked-svg')[1];
        fireEvent.keyDown(menuBtn, { key: 'Enter' });
        });
    });
});