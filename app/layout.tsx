import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import Intro from './components/preloader/Preloader';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Cookies from './components/cookies/Cookies';
import './globals.scss';
import { robotoCondensed } from './font';

interface BusinessInfo {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
    twitter: string;
    facebook: string;
    instagram: string;
}
interface SiteConfig {
    url: string;
    name: string;
    title: string;
    description: string;
}
const SITE_CONFIG: SiteConfig = {
    url: process.env.URL!,
    name: 'Skybound Studio',
    title: 'Skybound Studio - Développement Web & Design',
    description: 'Développeur web freelance spécialisé dans la création de sites internet personnalisés. Sites vitrines, boutiques en ligne et solutions sur mesure.',
};
const BUSINESS_INFO: BusinessInfo = {
    name: SITE_CONFIG.name,
    address: '1 bis Cour d\'orbitelle',
    city: 'Aix en Provence',
    postalCode: '13100',
    country: 'FR',
    phone: '+33 7 81 07 63 89',
    twitter: '@Skybound_Studio',
    facebook: 'https://www.facebook.com/profile.php?id=61583485317456',
    instagram: 'https://www.instagram.com/skybound_studio/',
};
export const metadataBase = new URL(SITE_CONFIG.url);
export const metadata: Metadata = {
    title: {
        default: SITE_CONFIG.title,
        template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    keywords: [
        'création site internet',
        'faire un site web',
        'créer un site vitrine',
        'développeur web freelance',
        'agence web',
        'site internet pas cher',
        'refonte site web',
        'site e-commerce',
        'développement sur mesure',
        'site responsive mobile',
        'SEO référencement',
        'maintenance site web',
        'hébergement site internet',
        'design moderne',
        'site professionnel'
    ],
    authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        url: SITE_CONFIG.url,
        siteName: SITE_CONFIG.name,
        title: SITE_CONFIG.title,
        description: SITE_CONFIG.description,
        images: [{
            url: `${SITE_CONFIG.url}/social.webp`,
            width: 1200,
            height: 630,
            alt: SITE_CONFIG.name,
        }],
    },
    twitter: {
        card: 'summary_large_image',
        site: BUSINESS_INFO.twitter,
        creator: BUSINESS_INFO.twitter,
        title: SITE_CONFIG.title,
        description: SITE_CONFIG.description,
        images: [`${SITE_CONFIG.url}/social.webp`],
    },
    alternates: {
        canonical: SITE_CONFIG.url,
        languages: { 'fr-FR': SITE_CONFIG.url },
    },
};
export const viewport = {
    width: 'device-width',
    initialScale: 1,
};
const businessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'WebDesignService'],
    '@id': `${SITE_CONFIG.url}#business`,
    name: BUSINESS_INFO.name,
    image: `${SITE_CONFIG.url}/social.webp`,
    description: SITE_CONFIG.description,
    address: {
        '@type': 'PostalAddress',
        streetAddress: BUSINESS_INFO.address,
        addressLocality: BUSINESS_INFO.city,
        postalCode: BUSINESS_INFO.postalCode,
        addressCountry: BUSINESS_INFO.country,
    },
    telephone: BUSINESS_INFO.phone,
    url: SITE_CONFIG.url,
    email: 'contact@skyboundstudio.fr',
    sameAs: [
        `https://twitter.com/${BUSINESS_INFO.twitter.replace('@', '')}`,
        BUSINESS_INFO.facebook,
        BUSINESS_INFO.instagram,
    ],
    serviceArea: {
        '@type': 'GeoCircle',
        geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: 43.5297,
            longitude: 5.4474,
        },
        geoRadius: '50000',
    },
    priceRange: '€€',
    openingHours: ['Mo-Fr 08:00-20:00'],
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services de développement web',
        itemListElement: [
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Création de site web',
                    description: 'Sites web modernes et performants',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Design web',
                    description: 'Design créatif et sur mesure',
                },
            },
        ],
    },
};
const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.url}#website`,
    url: SITE_CONFIG.url,
    name: BUSINESS_INFO.name,
    description: SITE_CONFIG.description,
    publisher: {
        '@type': 'Organization',
        name: BUSINESS_INFO.name,
    },
};
const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_CONFIG.url}#faq`,
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Quels services propose Skybound Studio ?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Nous proposons la création de sites web modernes, le design web créatif et sur mesure, ainsi que le développement d\'applications web performantes.',
            },
        },
        {
            '@type': 'Question',
            name: 'Dans quelle zone géographique intervenez-vous ?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Nous intervenons principalement dans la région d\'Aix-en-Provence et ses alentours, mais nous travaillons également à distance pour des projets partout en France.',
            },
        },
    ],
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="fr">
            <head>
                <meta name="theme-color" content="#1F2024" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="geo.region" content="FR-13" />
                <meta name="geo.placename" content="Aix-en-Provence" />
                <meta name="geo.position" content="43.5297;5.4474" />
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="dns-prefetch" href="https://vercel.live" />
                <link rel="dns-prefetch" href="https://vitals.vercel-analytics.com" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="preload" href="https://fonts.googleapis.com/icon?family=Material+Icons" as="style" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            </head>
            <body className={robotoCondensed.className}>
                <Intro />
                <Header />
                {children}
                <Footer />
                <Cookies />
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}