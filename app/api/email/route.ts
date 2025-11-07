import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const attempts = new Map<string, number[]>();
export async function POST(req: Request) {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || 'unknown';
    const now = Date.now();
    const userAttempts = attempts.get(ip) || [];
    const recentAttempts = userAttempts.filter(time => now - time < 10 * 60 * 1000);
    if (recentAttempts.length >= 3) {
        return NextResponse.json({ error: "Trop de tentatives. Réessayez dans 10 minutes." }, { status: 429 });
    }
    attempts.set(ip, [...recentAttempts, now]);
    const { name, email, phone, message } = await req.json();
    const cleanData = {
        name: name?.trim(),
        email: email?.trim().toLowerCase(),
        phone: phone?.trim(),
        message: message?.trim()
    };
    if (!cleanData.name || cleanData.name.length < 2) {
        return NextResponse.json({ error: "Nom invalide" }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanData.email || !emailRegex.exec(cleanData.email)) {
        return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }
    const phoneRegex = /^\+?[0-9\s\-]{6,15}$/;
    if (!cleanData.phone || !phoneRegex.exec(cleanData.phone)) {
        return NextResponse.json({ error: "Téléphone invalide" }, { status: 400 });
    }
    if (!cleanData.message || cleanData.message.length < 10) {
        return NextResponse.json({ error: "Message trop court" }, { status: 400 });
    }
    const transporter = nodemailer.createTransport({
        host: 'ssl0.ovh.net',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        },
    });
    try {
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: process.env.MAIL_USER,
            replyTo: cleanData.email,
            subject: `Nouveau message de ${cleanData.name}`,
            html: `
                <h3>Nouveau message depuis le site web</h3>
                <p><strong>Nom:</strong> ${cleanData.name}</p>
                <p><strong>Email:</strong> ${cleanData.email}</p>
                <p><strong>Téléphone:</strong> ${cleanData.phone}</p>
                <p><strong>Message:</strong></p>
                <p>${cleanData.message}</p>
            `,
        };
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true, message: "Email envoyé avec succès" });
    } catch (error) {
        console.error('Erreur envoi email:', error);
        return NextResponse.json(
            { success: false, message: "Erreur lors de l'envoi de l'email" },
            { status: 500 }
        );
    }
}