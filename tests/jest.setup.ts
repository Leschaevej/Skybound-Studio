import * as React from 'react';
import '@testing-library/jest-dom';

jest.mock('*.svg', () => {
    return React.forwardRef((props: any, ref: any) =>
        React.createElement('div', { ...props, ref, 'data-testid': 'mocked-svg' })
    );
});
jest.mock('next/font/google', () => ({
    Roboto_Serif: jest.fn(() => ({ className: 'mocked-roboto-serif' })),
    Roboto_Condensed: jest.fn(() => ({ className: 'mocked-roboto-condensed' })),
}));
type Screen = any;
type MockReturn = () => void;
export const mockScrollTo = jest.fn();
export const mockGetBoundingClientRect = jest.fn(() => ({
    height: 80, top: 100, bottom: 180, left: 0, right: 1200, width: 1200,
}));
export const mockFetch = jest.fn(() => Promise.resolve({ ok: true } as unknown as Response));
Object.defineProperty(window, 'scrollTo', { value: mockScrollTo, writable: true });
Object.defineProperty(Element.prototype, 'getBoundingClientRect', { value: mockGetBoundingClientRect, writable: true });
Object.defineProperty(window, 'pageYOffset', { value: 100, writable: true });
Object.defineProperty(window, 'IntersectionObserver', {
    writable: true, configurable: true,
    value: jest.fn().mockImplementation((callback) => ({
        observe: jest.fn(), disconnect: jest.fn(), unobserve: jest.fn(),
        callback: setTimeout(() => {
            const mockElement = { classList: { add: jest.fn() } };
            callback([{ isIntersecting: true, target: mockElement }]);
        }, 100),
    })),
});
Object.defineProperty(window, 'MutationObserver', {
    writable: true, configurable: true,
    value: jest.fn().mockImplementation(() => ({ observe: jest.fn(), disconnect: jest.fn() })),
});
global.fetch = mockFetch;
(global as any).SVGPathElement = class extends HTMLElement { getTotalLength = jest.fn(() => 100); };
Object.defineProperty(SVGElement.prototype, 'getTotalLength', { value: jest.fn(() => 100), writable: true });
const originalGetElementById = document.getElementById;
document.getElementById = jest.fn().mockImplementation((id) => {
    const realElement = originalGetElementById.call(document, id);
    if (realElement) return realElement;
    return {
        getBoundingClientRect: () => ({ top: 500, height: 100 }),
        querySelector: jest.fn().mockReturnValue(null),
        querySelectorAll: jest.fn().mockReturnValue([]),
        style: {}, classList: { add: jest.fn() }
    };
});
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
    mockFetch.mockImplementationOnce(() => Promise.resolve({
        ok: false, status: 400, statusText: 'Bad Request', headers: new Headers(), redirected: false,
        url: '', type: 'basic' as ResponseType, body: null, bodyUsed: false, clone: () => ({} as Response),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)), blob: () => Promise.resolve(new Blob()),
        formData: () => Promise.resolve(new FormData()), json: () => Promise.resolve({}), text: () => Promise.resolve('')
    } as Response));
};
export const mockFetchNetworkError = (): void => {
    mockFetch.mockImplementationOnce(() => Promise.reject(new Error('Network error')));
};
export const setupTimers = (): void => { jest.clearAllTimers(); jest.useFakeTimers(); };
export const cleanupTimers = (): void => { jest.runOnlyPendingTimers(); jest.useRealTimers(); };
export const cleanupMocks = (): void => {
    mockScrollTo.mockClear(); mockGetBoundingClientRect.mockClear(); mockFetch.mockClear(); jest.clearAllTimers();
};
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
(global as any).testUtils = {
    mockScrollTo, mockGetBoundingClientRect, mockFetch, fillContactForm, expectFormErrors,
    mockFetchError, mockFetchNetworkError, setupTimers, cleanupTimers, cleanupMocks,
    mockQuerySelector, mockGetElementById
};

