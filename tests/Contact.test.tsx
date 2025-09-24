import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from '../app/components/contact/Contact';
const { fillContactForm, expectFormErrors, mockFetchError, mockFetchNetworkError, mockFetch, cleanupMocks, setupTimers, cleanupTimers } = require('./jest.setup');

describe('ContactForm', () => {
  beforeEach(() => {
    cleanupMocks();
    render(<Contact />);
  });

  test('affiche tous les champs', () => {
    expect(screen.getByPlaceholderText(/nom/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/téléphone/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /envoyer/i })).toBeInTheDocument();
  });

  test('affiche les erreurs si champs invalides', () => {
    fireEvent.click(screen.getByRole('button', { name: /envoyer/i }));
    expectFormErrors(screen, ['nom', 'e-mail', 'téléphone', 'message']);
  });

  test('envoie le formulaire si valide', async () => {
    fillContactForm(screen);
    fireEvent.click(screen.getByRole('button', { name: /envoyer/i }));
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    expect(screen.getByRole('button')).toHaveTextContent(/communication établie/i);
  });

  test('gère les erreurs de fetch', async () => {
    mockFetchError();
    fillContactForm(screen);
    fireEvent.click(screen.getByRole('button', { name: /envoyer/i }));
    await waitFor(() => expect(screen.getByRole('button')).toHaveTextContent(/erreur, réessayez/i));
  });

  test('gère les erreurs réseau', async () => {
    mockFetchNetworkError();
    fillContactForm(screen);
    fireEvent.click(screen.getByRole('button', { name: /envoyer/i }));
    await waitFor(() => expect(screen.getByRole('button')).toHaveTextContent(/erreur, réessayez/i));
  });

  test('clearError au changement', () => {
    fireEvent.click(screen.getByRole('button', { name: /envoyer/i }));
    const nameInput = screen.getByPlaceholderText(/nom/i);
    expect(nameInput).toHaveClass('invalid');
    fireEvent.change(nameInput, { target: { value: 'Jean' } });
    expect(nameInput).not.toHaveClass('invalid');
  });

  test('validation spécifique des champs', () => {
    const testCases = [
      { field: /nom/i, value: 'A' },
      { field: /e-mail/i, value: 'invalid' },
      { field: /téléphone/i, value: '123' },
      { field: /message/i, value: 'Court' },
    ];

    testCases.forEach(({ field, value }) => {
      fireEvent.change(screen.getByPlaceholderText(field), { target: { value } });
      fireEvent.click(screen.getByRole('button', { name: /envoyer/i }));
      expect(screen.getByPlaceholderText(field)).toHaveClass('invalid');
    });
  });

  test('remet à zéro après succès', async () => {
    fillContactForm(screen);
    fireEvent.click(screen.getByRole('button', { name: /envoyer/i }));
    await waitFor(() => expect(screen.getByRole('button')).toHaveTextContent(/communication établie/i));

    ['nom', 'e-mail', 'téléphone', 'message'].forEach(field => {
      expect(screen.getByPlaceholderText(new RegExp(field, 'i'))).toHaveValue('');
    });
  });

  test('timeout après succès', async () => {
    setupTimers();
    fillContactForm(screen);
    fireEvent.click(screen.getByRole('button', { name: /envoyer/i }));
    await waitFor(() => expect(screen.getByRole('button')).toHaveTextContent(/communication établie/i));

    jest.advanceTimersByTime(3000);
    await waitFor(() => expect(screen.getByRole('button')).toHaveTextContent(/envoyer/i));
    cleanupTimers();
  });

  describe('Accessibilité', () => {
    test('attributs ARIA corrects', () => {
      const inputs = document.querySelectorAll('input');
      inputs.forEach(input => {
        expect(input).toHaveAttribute('aria-label');
        expect(input).toHaveAttribute('aria-required');
      });
    });

    test('structure sémantique', () => {
      expect(document.querySelectorAll('form')).toHaveLength(1);
      expect(document.querySelectorAll('input[type="email"]')).toHaveLength(1);
      expect(document.querySelectorAll('input[type="tel"]')).toHaveLength(1);
    });
  });
});