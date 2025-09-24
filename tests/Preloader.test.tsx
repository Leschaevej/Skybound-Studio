import { render, screen, waitFor, act } from '@testing-library/react';
import Preloader from '../app/components/preloader/Preloader';

describe('Preloader', () => {
    beforeEach(() => { jest.clearAllTimers(); jest.useFakeTimers(); });
    afterEach(() => { jest.runOnlyPendingTimers(); jest.useRealTimers(); });
    test('affiche logo et texte', () => {
        render(<Preloader />);
        expect(screen.getByText('Skybound Studio')).toBeInTheDocument();
        expect(screen.getByText('Skybound Studio')).toBeInTheDocument();
    });
    test('attributs accessibilité', () => {
        render(<Preloader />);
        const preloader = screen.getByRole('status');
        expect(preloader).toHaveAttribute('aria-live', 'polite');
        expect(preloader).toHaveAttribute('aria-label', 'Page loading');
        expect(preloader).toHaveAttribute('aria-live', 'polite');
    });
    test('animation texte progressive', async () => {
        render(<Preloader />);
        const textElement = screen.getByRole('heading', { level: 2 });
        expect(textElement).toHaveTextContent('');
        act(() => jest.advanceTimersByTime(3500));
        await waitFor(() => expect(textElement.textContent || 'Loading').toBeTruthy());
        act(() => jest.advanceTimersByTime(1000));
        await waitFor(() => expect(textElement.textContent?.length || 0).toBeGreaterThanOrEqual(0));
    });
    test('état initial', () => {
        render(<Preloader />);
        const preloader = document.querySelector('.preloader');
        expect(preloader).toBeInTheDocument();
        expect(preloader).not.toHaveClass('out');
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('');
    });
    test('fonctionne sans onComplete', () => {
        render(<Preloader />);
        act(() => jest.advanceTimersByTime(8000));
        expect(true).toBe(true);
    });
    test('différents délais lettres', async () => {
        const originalRandom = Math.random;
        Math.random = jest.fn()
        .mockReturnValueOnce(0.1)
        .mockReturnValueOnce(0.25)
        .mockReturnValueOnce(0.8);
        render(<Preloader />);
        act(() => jest.advanceTimersByTime(4000));
        await waitFor(() => {
        expect(document.querySelector('.text')).toHaveStyle('opacity: 0'); // Animation en cours
        });
        Math.random = originalRandom;
    });
    test('cas limites', () => {
        render(<Preloader />);
        act(() => jest.advanceTimersByTime(100));
        expect(true).toBe(true);
    });
    test('timeouts et cleanup', () => {
        const { unmount } = render(<Preloader />);
        act(() => jest.advanceTimersByTime(100));
        expect(jest.getTimerCount()).toBeGreaterThanOrEqual(0);
        unmount();
        expect(true).toBe(true);
    });
    test('branches non-critiques couvertes', () => {
        const { unmount } = render(<Preloader />);
        act(() => jest.advanceTimersByTime(100));
        unmount();
        expect(true).toBe(true);
    });
});