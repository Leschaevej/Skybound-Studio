'use client';
import { useState, useEffect } from 'react';
import './Contact.scss';

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}
interface FormErrors {
    name: boolean;
    email: boolean;
    phone: boolean;
    message: boolean;
}
const useValidation = (formData: ContactFormData) => {
    const [errors, setErrors] = useState<FormErrors>({
        name: false,
        email: false,
        phone: false,
        message: false,
    });
    const validate = () => {
        let isValid = true;
        const newErrors: FormErrors = { name: false, email: false, phone: false, message: false };
        if (!formData.name || formData.name.trim().length < 2) {
            newErrors.name = true;
            isValid = false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.exec(formData.email)) {
            newErrors.email = true;
            isValid = false;
        }
        const phoneRegex = /^\+?[0-9\s\-]{6,15}$/;
        if (!formData.phone || !phoneRegex.exec(formData.phone)) {
            newErrors.phone = true;
            isValid = false;
        }
        if (!formData.message || formData.message.trim().length < 10) {
            newErrors.message = true;
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };
    const clearError = (field: keyof FormErrors) => {
        setErrors(prev => ({ ...prev, [field]: false }));
    };
    return { errors, validate, clearError };
};
export default function ContactForm() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const { errors, validate, clearError } = useValidation(formData);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        clearError(e.target.name as keyof FormErrors);
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return; 
        setStatus('sending');
        try {
            const res = await fetch('/api/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setStatus('success'); 
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };
    useEffect(() => {
        if (status === 'success' || status === 'error') {
            const timer = setTimeout(() => setStatus('idle'), 3000);
            return () => clearTimeout(timer);
        }
    }, [status]);
    return (
        <form className="form" onSubmit={handleSubmit} noValidate>
            <input
                type="text"
                name="name"
                placeholder="Nom"
                aria-label="Nom"
                aria-invalid={errors.name}
                aria-required="true"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'invalid' : ''}
            />
            <input
                type="email"
                name="email"
                placeholder="E-mail"
                aria-label="E-mail"
                aria-invalid={errors.email}
                aria-required="true"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'invalid' : ''}
            />
            <input
                type="tel"
                name="phone"
                placeholder="Téléphone"
                aria-label="Téléphone"
                aria-invalid={errors.phone}
                aria-required="true"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'invalid' : ''}
            />
            <textarea
                name="message"
                placeholder="Message"
                aria-label="Message"
                aria-invalid={errors.message}
                aria-required="true"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? 'invalid' : ''}
            />
            <button
                type="submit"
                disabled={status === 'sending'}
                className={status}
                aria-label={
                    status === 'sending'
                        ? 'Envoi du message en cours'
                        : status === 'success'
                        ? 'Message envoyé avec succès'
                        : status === 'error'
                        ? 'Erreur lors de l\'envoi, cliquez pour réessayer'
                        : 'Envoyer le message de contact'
                }
            >
                {status === 'sending'
                    ? 'Décollage...'
                    : status === 'success'
                    ? 'Communication établie'
                    : status === 'error'
                    ? 'Erreur, réessayez'
                    : 'Envoyer'}
            </button>
        </form>
    );
}