"use client";
import { useState, useEffect } from "react";
import "./Contact.scss";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [errors, setErrors] = useState({
        name: false,
        email: false,
        phone: false,
        message: false,
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: false });
    };
    const validate = () => {
        let isValid = true;
        const newErrors = { name: false, email: false, phone: false, message: false };
        if (!formData.name || formData.name.trim().length < 2) {
            newErrors.name = true;
            isValid = false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            newErrors.email = true;
            isValid = false;
        }
        const phoneRegex = /^\+?[0-9\s\-]{6,15}$/;
        if (!formData.phone || !phoneRegex.test(formData.phone)) {
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
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
            setStatus("sending");
        try {
            const res = await fetch("/api/email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
        });
        if (res.ok) {
            setStatus("success");
            setFormData({ name: "", email: "", phone: "", message: "" });
        } else {
            setStatus("error");
        }
        } catch (err) {
        setStatus("error");
        }
    };
    useEffect(() => {
        if (status === "success" || status === "error") {
            const timer = setTimeout(() => setStatus("idle"), 3000);
            return () => clearTimeout(timer);
        }
    }, [status]);
    return (
        <form className="form" onSubmit={handleSubmit} noValidate>
            <input
                type="text"
                name="name"
                placeholder="Nom"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "invalid" : ""}
            />
            <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "invalid" : ""}
            />
            <input
                type="tel"
                name="phone"
                placeholder="Téléphone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "invalid" : ""}
            />
            <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? "invalid" : ""}
            />
            <button
                type="submit"
                disabled={status === "sending"}
                className={status}
            >
                {status === "sending"
                    ? "Décollage..."
                    : status === "success"
                    ? "Communication établie"
                    : status === "error"
                    ? "Erreur, réessayez"
                    : "Envoyer"}
            </button>
        </form>
    );
}