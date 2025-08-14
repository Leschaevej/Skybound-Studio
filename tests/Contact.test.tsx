import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from '../app/components/contact/Contact';

global.fetch = jest.fn(() => Promise.resolve({ ok: true })) as jest.Mock;

describe('ContactForm', () => {
    beforeEach(() => {
        (fetch as jest.Mock).mockClear();
        render(<Contact />);
    });
    test('affiche tous les champs', () => {
        expect(screen.getByPlaceholderText(/nom/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/e-mail/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/téléphone/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/message/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /envoyer/i })).toBeInTheDocument();
    });
    test('affiche les erreurs si champs invalides', async () => {
        fireEvent.click(screen.getByRole('button', { name: /envoyer/i }));
        const inputs = [
        screen.getByPlaceholderText(/nom/i),
        screen.getByPlaceholderText(/e-mail/i),
        screen.getByPlaceholderText(/téléphone/i),
        screen.getByPlaceholderText(/message/i)
        ];
        inputs.forEach(input => {
        expect(input).toHaveClass('invalid');
        });
    });
    test('envoie le formulaire si valide', async () => {
        fireEvent.change(screen.getByPlaceholderText(/nom/i), { target: { value: 'Jean' } });
        fireEvent.change(screen.getByPlaceholderText(/e-mail/i), { target: { value: 'jean@test.com' } });
        fireEvent.change(screen.getByPlaceholderText(/téléphone/i), { target: { value: '+33123456789' } });
        fireEvent.change(screen.getByPlaceholderText(/message/i), { target: { value: 'Bonjour, ceci est un test.' } });
        fireEvent.click(screen.getByRole('button', { name: /envoyer/i }));
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        expect(screen.getByRole('button')).toHaveTextContent(/communication établie/i);
    });
    test('affiche erreur si fetch échoue', async () => {
        (fetch as jest.Mock).mockImplementationOnce(() => Promise.resolve({ ok: false }));
        fireEvent.change(screen.getByPlaceholderText(/nom/i), { target: { value: 'Jean' } });
        fireEvent.change(screen.getByPlaceholderText(/e-mail/i), { target: { value: 'jean@test.com' } });
        fireEvent.change(screen.getByPlaceholderText(/téléphone/i), { target: { value: '+33123456789' } });
        fireEvent.change(screen.getByPlaceholderText(/message/i), { target: { value: 'Bonjour, ceci est un test.' } });
        fireEvent.click(screen.getByRole('button', { name: /envoyer/i }));
        await waitFor(() => expect(screen.getByRole('button')).toHaveTextContent(/erreur, réessayez/i));
    });
});