import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { name, email, phone, message } = await req.json();
    if (!name || !email || !message) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
        },
    });
    try {
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: process.env.MAIL_USER,
            replyTo: email,
            subject: `Nouveau message de ${name}`,
            text: `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\n\nMessage:\n${message}`,
        });
        return NextResponse.json({ message: "Message envoyé" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erreur lors de l'envoi" }, { status: 500 });
    }
}