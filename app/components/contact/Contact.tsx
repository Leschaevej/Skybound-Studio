'use client';
import { useState, useEffect } from 'react';
import './Contact.scss';

// Types pour structurer les données du formulaire de contact

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}
// Types pour gérer les erreurs de validation (true = erreur)
interface FormErrors {
    name: boolean;
    email: boolean;
    phone: boolean;
    message: boolean;
}
// Hook personnalisé pour gérer la validation des champs du formulaire
const useValidation = (formData: ContactFormData) => {
    const [errors, setErrors] = useState<FormErrors>({
        name: false,
        email: false,
        phone: false,
        message: false,
    });
    // Fonction qui vérifie tous les champs et retourne true si le formulaire est valide
    const validate = () => {
        let isValid = true;
        const newErrors: FormErrors = { name: false, email: false, phone: false, message: false };
        // Validation du nom (minimum 2 caractères)
        if (!formData.name || formData.name.trim().length < 2) {
            newErrors.name = true;
            isValid = false;
        }
        // Validation de l'email avec une expression régulière
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.exec(formData.email)) {
            newErrors.email = true;
            isValid = false;
        }
        // Validation du téléphone (6-15 chiffres, espaces et tirets autorisés)
        const phoneRegex = /^\+?[0-9\s\-]{6,15}$/;
        if (!formData.phone || !phoneRegex.exec(formData.phone)) {
            newErrors.phone = true;
            isValid = false;
        }
        // Validation du message (minimum 10 caractères)
        if (!formData.message || formData.message.trim().length < 10) {
            newErrors.message = true;
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };
    // Fonction pour effacer l'erreur d'un champ quand l'utilisateur commence à taper
    const clearError = (field: keyof FormErrors) => {
        setErrors(prev => ({ ...prev, [field]: false }));
    };
    return { errors, validate, clearError };
};
// Composant principal du formulaire de contact
export default function ContactForm() {
    // État pour stocker les données saisies dans le formulaire
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    // Utilisation du hook de validation
    const { errors, validate, clearError } = useValidation(formData);
    // État pour suivre le statut de l'envoi du formulaire
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    // Fonction appelée quand l'utilisateur tape dans un champ
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        clearError(e.target.name as keyof FormErrors); // Efface l'erreur dès que l'utilisateur tape
    };
    // Fonction appelée quand l'utilisateur soumet le formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return; // Arrête si le formulaire n'est pas valide
        setStatus('sending'); // Change le bouton en "Décollage..."
        try {
            // Envoi des données à l'API email du serveur
            const res = await fetch('/api/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setStatus('success'); // Affiche "Communication établie"
                setFormData({ name: '', email: '', phone: '', message: '' }); // Vide le formulaire
            } else {
                setStatus('error'); // Affiche "Erreur, réessayez"
            }
        } catch {
            setStatus('error'); // En cas d'erreur réseau
        }
    };
    // Remet le bouton à "Envoyer" après 3 secondes en cas de succès ou d'erreur
    useEffect(() => {
        if (status === 'success' || status === 'error') {
            const timer = setTimeout(() => setStatus('idle'), 3000);
            return () => clearTimeout(timer);
        }
    }, [status]);
    return (
        <form className="form" onSubmit={handleSubmit} noValidate>
            {/* Champ pour le nom de l'utilisateur */}
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
                className={errors.name ? 'invalid' : ''} // Classe CSS rouge si erreur
            />
            {/* Champ pour l'adresse email */}
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
            {/* Champ pour le numéro de téléphone */}
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
            {/* Zone de texte pour le message */}
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
            {/* Bouton d'envoi qui change de texte selon le statut */}
            <button
                type="submit"
                disabled={status === 'sending'} // Désactivé pendant l'envoi
                className={status} // Classe CSS qui change selon le statut
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
                {/* Texte du bouton qui change selon le statut */}
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