import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import "./globals.scss";
import { robotoCondensed } from "./font";

export const metadataBase = new URL("https://skyboundstudio.fr");

export const metadata: Metadata = {
    title: {
        default: "Skybound Studio - Développement Web & Design",
        template: "%s | Skybound Studio",
    },
    description:
        "Agence de développement web créative, spécialisée dans les sites modernes, performants et sur mesure.",
    keywords: [
        "développement web",
        "création site internet",
        "site vitrine",
        "design web",
        "Skybound Studio",
    ],
    authors: [{ name: "Skybound Studio", url: "https://skyboundstudio.fr" }],
    robots: {
        index: true,
        follow: true,
        nocache: false,
    },
    openGraph: {
        type: "website",
        locale: "fr_FR",
        url: "https://skyboundstudio.fr",
        siteName: "Skybound Studio",
        title: "Skybound Studio - Développement Web & Design",
        description:
        "Agence de développement web créative, spécialisée dans les sites modernes, performants et sur mesure.",
        images: [
        {
            url: "https://skyboundstudio.fr/social.png",
            width: 1200,
            height: 630,
            alt: "Skybound Studio",
        },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@Fre3DoMind",
        title: "Skybound Studio - Développement Web & Design",
        description:
        "Agence de développement web créative, spécialisée dans les sites modernes, performants et sur mesure.",
        images: ["https://skyboundstudio.fr/social.png"],
    },
    alternates: {
        canonical: "https://skyboundstudio.fr",
        languages: {
        "fr-FR": "https://skyboundstudio.fr",
        },
    },
};
export const viewport = {
    width: "device-width",
    initialScale: 1,
};
export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="fr">
            <head>
                <meta charSet="utf-8" />
                <meta name="theme-color" content="#1F2024" />
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="apple-touch-icon" href="/apple.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        "@id": "https://skyboundstudio.fr#business",
                        name: "Skybound Studio",
                        image: "https://skyboundstudio.fr/social.webp",
                        address: {
                            "@type": "PostalAddress",
                            streetAddress: "1 bis Cour d'orbitelle",
                            addressLocality: "Aix en Provence",
                            postalCode: "13100",
                            addressCountry: "FR",
                        },
                        telephone: "+33 7 81 07 63 89",
                        url: "https://skyboundstudio.fr",
                        }),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "@id": "https://skyboundstudio.fr#website",
                        url: "https://skyboundstudio.fr",
                        name: "Skybound Studio",
                        publisher: {
                            "@type": "Organization",
                            name: "Skybound Studio",
                        },
                        }),
                    }}
                />
            </head>
            <body className={robotoCondensed.className}>
                <Header />
                    <main>{children}</main>
                <Footer />
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
