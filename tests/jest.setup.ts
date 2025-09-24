// ===== SETUP & MOCKS TOUT-EN-UN TypeScript =====
import * as React from 'react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';

// Types pour nos utilitaires
type Screen = any;
type MockReturn = () => void;

// Étendre Jest avec axe
expect.extend(toHaveNoViolations);

// ===== MOCKS DOM =====
export const mockScrollTo = jest.fn();
export const mockGetBoundingClientRect = jest.fn(() => ({
  height: 80,
  top: 100,
  bottom: 180,
  left: 0,
  right: 1200,
  width: 1200,
}));

// ===== MOCKS API =====
export const mockFetch = jest.fn(() => Promise.resolve({ ok: true } as unknown as Response));

// ===== SETUP GLOBAL AUTO =====
// DOM Mocks
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
});

Object.defineProperty(Element.prototype, 'getBoundingClientRect', {
  value: mockGetBoundingClientRect,
  writable: true,
});

Object.defineProperty(window, 'pageYOffset', {
  value: 100,
  writable: true,
});

// Observers
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: jest.fn().mockImplementation((callback) => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
    callback: setTimeout(() => {
      const mockElement = { classList: { add: jest.fn() } };
      callback([{ isIntersecting: true, target: mockElement }]);
    }, 100),
  })),
});

Object.defineProperty(window, 'MutationObserver', {
  writable: true,
  configurable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
  })),
});

// API Mocks
global.fetch = mockFetch;

// SVG Mocks
global.SVGPathElement = class extends HTMLElement {
  getTotalLength = jest.fn(() => 100);
};

Object.defineProperty(SVGElement.prototype, 'getTotalLength', {
  value: jest.fn(() => 100),
  writable: true,
});

// getElementById mock
const originalGetElementById = document.getElementById;
document.getElementById = jest.fn().mockImplementation((id) => {
  const realElement = originalGetElementById.call(document, id);
  if (realElement) return realElement;

  return {
    getBoundingClientRect: () => ({ top: 500, height: 100 }),
    querySelector: jest.fn().mockReturnValue(null),
    querySelectorAll: jest.fn().mockReturnValue([]),
    style: {},
    classList: { add: jest.fn() }
  };
});

// ===== UTILITAIRES EXPORTÉS =====
export const fillContactForm = (screen: Screen): void => {
  const { fireEvent } = require('@testing-library/react');
  fireEvent.change(screen.getByPlaceholderText(/nom/i), { target: { value: 'Jean' } });
  fireEvent.change(screen.getByPlaceholderText(/e-mail/i), { target: { value: 'jean@test.com' } });
  fireEvent.change(screen.getByPlaceholderText(/téléphone/i), { target: { value: '+33123456789' } });
  fireEvent.change(screen.getByPlaceholderText(/message/i), { target: { value: 'Bonjour, ceci est un test.' } });
};

export const expectFormErrors = (screen: Screen, fields: string[]): void => {
  fields.forEach(field => {
    expect(screen.getByPlaceholderText(new RegExp(field, 'i'))).toHaveClass('invalid');
  });
};

export const mockFetchError = (): void => {
  mockFetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));
};

export const mockFetchNetworkError = (): void => {
  mockFetch.mockImplementationOnce(() => Promise.reject(new Error('Network error')));
};

export const setupTimers = (): void => {
  jest.clearAllTimers();
  jest.useFakeTimers();
};

export const cleanupTimers = (): void => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
};

export const cleanupMocks = (): void => {
  mockScrollTo.mockClear();
  mockGetBoundingClientRect.mockClear();
  mockFetch.mockClear();
  jest.clearAllTimers();
};

// ===== NEXT.JS FONT MOCK =====
export const Roboto_Serif = jest.fn(() => ({
  className: 'mocked-roboto-serif',
}));

export const Roboto_Condensed = jest.fn(() => ({
  className: 'mocked-roboto-condensed',
}));

export const mockQuerySelector = (returnValue: any): MockReturn => {
  const original = document.querySelector;
  document.querySelector = jest.fn().mockReturnValue(returnValue);
  return () => { document.querySelector = original; };
};

export const mockGetElementById = (returnValue: any): MockReturn => {
  const original = document.getElementById;
  document.getElementById = jest.fn().mockReturnValue(returnValue);
  return () => { document.getElementById = original; };
};

// ===== SVG/ASSET MOCK (remplace test-file-stub.js) =====
// Export par défaut pour les assets
const MockSVG = (props: any = {}) => React.createElement('svg', {
  'data-testid': 'mocked-svg',
  width: 100,
  height: 100,
  ...props
}, React.createElement('path', { d: 'M0 0L10 10' }));

// Pour que Jest puisse utiliser ce fichier comme mock des assets
export default MockSVG;

// Hack pour que module.exports fonctionne avec TypeScript
(module as any).exports = MockSVG;
(module as any).exports.default = MockSVG;

// Export des fonctions Next.js pour que le module mapping fonctionne
(module as any).exports.Roboto_Serif = Roboto_Serif;
(module as any).exports.Roboto_Condensed = Roboto_Condensed;

// Export de toutes les fonctions utilitaires pour les imports
(module as any).exports.mockScrollTo = mockScrollTo;
(module as any).exports.mockGetBoundingClientRect = mockGetBoundingClientRect;
(module as any).exports.mockFetch = mockFetch;
(module as any).exports.fillContactForm = fillContactForm;
(module as any).exports.expectFormErrors = expectFormErrors;
(module as any).exports.mockFetchError = mockFetchError;
(module as any).exports.mockFetchNetworkError = mockFetchNetworkError;
(module as any).exports.setupTimers = setupTimers;
(module as any).exports.cleanupTimers = cleanupTimers;
(module as any).exports.cleanupMocks = cleanupMocks;
(module as any).exports.mockQuerySelector = mockQuerySelector;
(module as any).exports.mockGetElementById = mockGetElementById;