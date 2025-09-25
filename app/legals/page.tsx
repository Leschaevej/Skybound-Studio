"use client";

import { useState } from 'react';
import Header from '../components/header/Header';
import "./page.scss";

export default function Legals() {
    const [headerHeight, setHeaderHeight] = useState(0);
    const handleCookieSettings = () => {
        window.dispatchEvent(new CustomEvent('openCookieModal', { detail: { mode: 'manage' } }));
    };
    return (
        <>
        <Header onHeightChange={setHeaderHeight} />
        <main style={{ paddingTop: `${headerHeight}px` }}>
            <section className="legals">
                <h2>Mentions légales</h2>
                <h3>1- Présentation du site</h3>
                <p>En vertu de l&apos;article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique, il est précisé aux utilisateurs du site www.skyboundstudio.fr l&apos;identité des différents intervenants dans le cadre de sa réalisation et de son suivi :</p>
                <p><strong>Propriétaire :</strong> Skybound Studio – Micro-entreprise – SIRET : 988 902 755 00012 – 1 Bis Cour D&apos;Orbitelle, 13100 Aix-en-Provence – Tél : 07 81 07 63 89 – Email : leschaeve.jimmy@gmail.com</p>
                <p><strong>Créateur :</strong> Jimmy Leschaeve – Directeur de publication</p>
                <p><strong>Hébergeur :</strong> Vercel Inc. – 340 S Lemon Ave, Suite 4133, Walnut, CA 91789, USA – Email : support@vercel.com</p>
                <h3>2- Conditions générales d&apos;utilisation du site et des services proposés</h3>
                <p>L&apos;utilisation du site www.skyboundstudio.fr implique l&apos;acceptation pleine et entière des conditions générales d&apos;utilisation ci-après décrites. Ces conditions d&apos;utilisation sont susceptibles d&apos;être modifiées ou complétées à tout moment, les utilisateurs sont donc invités à les consulter régulièrement.</p>
                <p>Le site est normalement accessible à tout moment aux utilisateurs. Une interruption pour raison de maintenance technique peut être décidée par Skybound Studio qui s&apos;efforcera de communiquer préalablement aux utilisateurs les dates et heures d&apos;intervention.</p>
                <h3>3- Description des services fournis</h3>
                <p>Le site www.skyboundstudio.fr a pour objet de présenter l&apos;activité de Skybound Studio et de permettre la prise de contact.</p>
                <p>Skybound Studio s&apos;efforce de fournir sur le site des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu&apos;elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.</p>
                <p>Toutes les informations indiquées sur le site sont données à titre indicatif et sont susceptibles d&apos;évoluer. Elles sont données sous réserve de modifications depuis leur mise en ligne.</p>
                <h3>4- Limitations contractuelles sur les données techniques</h3>
                <p>Le site utilise la technologie JavaScript. Le site Internet ne pourra être tenu responsable de dommages matériels liés à l&apos;utilisation du site. L&apos;utilisateur s&apos;engage à accéder au site avec un matériel récent, ne contenant pas de virus et avec un navigateur de dernière génération mis à jour.</p>
                <h3>5- Propriété intellectuelle et contrefaçons</h3>
                <p>Sauf mention contraire, Skybound Studio est propriétaire des droits de propriété intellectuelle ou détient les droits d&apos;usage sur tous les éléments accessibles sur le site, notamment textes, images, graphismes, logos et icônes.</p>
                <p>Toute exploitation non autorisée du site ou des éléments qu&apos;il contient sera considérée comme constitutive d&apos;une contrefaçon et poursuivie conformément aux articles L.335-2 et suivants du Code de Propriété Intellectuelle.</p>
                <h3>6- Limitations de responsabilité</h3>
                <p>Skybound Studio ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l&apos;utilisateur lors de l&apos;accès au site. Les espaces interactifs (formulaire de contact, commentaires) sont à disposition des utilisateurs. Tout contenu contraire à la législation française pourra être supprimé sans préavis.</p>
                <h3>7- Liens hypertextes et cookies</h3>
                <p>Le site peut contenir des liens vers d&apos;autres sites. Skybound Studio n&apos;a pas la possibilité de vérifier le contenu de ces sites et n&apos;assume aucune responsabilité.</p>
                <p>La navigation peut provoquer l&apos;installation de cookies. Vous pouvez configurer votre navigateur pour refuser les cookies :</p>
                <ul>
                    <li><strong>Internet Explorer :</strong> Onglet Outils (pictogramme en forme de rouage en haut à droite) → Options Internet → Confidentialité → choisir Bloquer tous les cookies → Valider par OK.</li>
                    <li><strong>Microsoft Edge :</strong> Menu (trois points en haut à droite) → Paramètres → Cookies et autorisations de site → Gérer et supprimer les cookies et données du site → Bloquer tous les cookies.</li>
                    <li><strong>Firefox :</strong> Menu Firefox → Paramètres → Vie privée et sécurité → Historique → Utiliser les paramètres personnalisés pour l&apos;historique → cocher Bloquer les cookies.</li>
                    <li><strong>Safari :</strong> Menu Safari → Préférences → Confidentialité → Cookies et données de sites → Bloquer tous les cookies.</li>
                    <li><strong>Chrome :</strong> Menu Chrome (trois points en haut à droite) → Paramètres → Confidentialité et sécurité → Cookies et autres données de site → Bloquer tous les cookies.</li>
                </ul>
                <h3>8- Droit applicable et attribution de juridiction</h3>
                <p>Tout litige en relation avec l&apos;utilisation du site est soumis au droit français. Attribution exclusive de juridiction aux tribunaux compétents.</p>
                <h3>9- Les principales lois concernées</h3>
                <ul>
                    <li>Loi n° 78-17 du 6 janvier 1978, modifiée par la loi n° 2004-801 du 6 août 2004 relative à l&apos;informatique et aux libertés.</li>
                    <li>Loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique.</li>
                    <li>Règlement européen n° 2016/679 (RGPD).</li>
                </ul>
                <h3>10- Lexique</h3>
                <p><strong>Utilisateur :</strong> Internaute se connectant, utilisant le site.</p>
                <p><strong>Informations personnelles :</strong> &laquo; Les informations qui permettent, directement ou indirectement, l&apos;identification des personnes physiques auxquelles elles s&apos;appliquent &raquo; (article 4 de la loi n° 78-17 du 6 janvier 1978).</p>
            </section>
            <section className="confidentiality">
                <h2>Politique de confidentialité</h2>
                <h3>1- Collecte des renseignements personnels</h3>
                <p>Les informations collectées sont celles que vous saisissez dans le formulaire de contact Vercel (nom, email, message).</p>
                <h3>2- Formulaires et interactivité</h3>
                <p>Vos renseignements sont collectés via le formulaire de contact Vercel dans le but de répondre à vos demandes. Les données de navigation sont également collectées via Vercel Analytics et Speed Insights à des fins statistiques anonymes.</p>
                <h4>2.1- Droit d&apos;opposition et de retrait</h4>
                <p>Vous pouvez vous opposer ou demander le retrait de vos informations en contactant : Skybound Studio – Tél : 07 81 07 63 89 – Email : leschaeve.jimmy@gmail.com</p>
                <h4>2.2- Droit d&apos;accès et de rectification</h4>
                <p>Vous pouvez accéder à vos informations personnelles, les modifier ou demander leur suppression en contactant : Skybound Studio – Tél : 07 81 07 63 89 – Email : leschaeve.jimmy@gmail.com</p>
                <h4>2.3- Sécurité</h4>
                <p>Les informations sont conservées dans un environnement sécurisé chez Vercel, et les employés ou partenaires respectent la confidentialité. Pour garantir cette sécurité, le site utilise un protocole SSL et effectue des sauvegardes régulières. Aucune information personnelle n&apos;est cédée ou vendue à des tiers.</p>
                <h3>3- Législation</h3>
                <p>Le site respecte les dispositions législatives du RGPD et des lois françaises relatives aux données personnelles.</p>
            </section>
            <section className="cookies">
                <h2>Information concernant les cookies</h2>
                <h3>Qu&apos;est-ce qu&apos;un cookie ?</h3>
                <p>La Commission Nationale de l&apos;Informatique et des Libertés (CNIL) définit un cookie comme &laquo; une information déposée sur votre disque dur par le serveur du site que vous visitez &raquo;. Il contient le nom du serveur qui l&apos;a déposée, un identifiant unique et éventuellement une date d&apos;expiration. Ces informations sont stockées sur votre ordinateur dans un simple fichier texte auquel le serveur peut accéder pour lire ou enregistrer des informations.</p>
                <h3>À quoi servent les cookies ?</h3>
                <p>Les cookies permettent de reconnaître un internaute d&apos;une visite à l&apos;autre grâce à un identifiant unique. Ils peuvent également être utilisés pour stocker le contenu d&apos;un panier d&apos;achat, enregistrer les paramètres de langue d&apos;un site, faire de la publicité ciblée ou mesurer l&apos;audience du site.</p>
                <h3>Quels cookies utilise le site www.skyboundstudio.fr et comment les gérer ?</h3>
                <p>Le site utilise uniquement des cookies liés aux statistiques de visites fournies par Vercel Analytics et Speed Insights. Ces cookies ne permettent pas d&apos;identifier personnellement les visiteurs et ne sont utilisés ni pour de la publicité, ni pour le suivi comportemental.</p>
                <p>Vous pouvez accepter ou refuser les cookies en configurant votre navigateur. Il est possible de choisir d&apos;accepter ou de rejeter les cookies systématiquement ou selon leur émetteur, et de recevoir une notification avant qu&apos;un cookie soit enregistré. Les instructions pour configurer ces choix sont disponibles dans le menu d&apos;aide de votre navigateur.</p>
                <h3>Durée de validité de votre accord</h3>
                <p>Votre accord concernant le dépôt des cookies de mesure d&apos;audience Vercel Analytics est valable 13 mois. Passé ce délai, un bandeau vous informant de l&apos;utilisation de ces cookies et vous permettant de vous y opposer réapparaîtra sur la page d&apos;accueil. Vous pouvez également vous opposer au dépôt de ces cookies à tout moment via le lien prévu à cet effet ci-dessous.</p>
            </section>
            <section className="devis">
                <h2>CGV devis et factures</h2>
                <p><em>Les devis et factures émis par Skybound Studio renvoient aux présentes conditions générales de vente disponibles sur www.skyboundstudio.fr</em></p>
                <h3>1- Objet</h3>
                <p>Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre Skybound Studio, micro-entreprise représentée par Jimmy Leschaeve, et toute personne physique ou morale (ci-après « le Client ») souhaitant bénéficier de ses prestations de création de sites internet, supports visuels et services de design.</p>
                <h3>2- Tarifs et devis</h3>
                <p>Les prix sont exprimés en euros, toutes taxes comprises (TTC), TVA non applicable (article 293B du CGI).</p>
                <p>Un devis personnalisé est établi avant toute prestation. La validation du devis par le Client, accompagnée de la mention « Bon pour accord », vaut acceptation des présentes CGV.</p>
                <p>Le devis est valable 30 jours à compter de sa date d&apos;émission.</p>
                <h3>3- Commande et acompte</h3>
                <p>Toute commande est considérée comme ferme à compter de la réception du devis signé.</p>
                <p>Un acompte minimum de 30% du montant total est exigé à la commande. Le solde est payable à la livraison, sauf conditions particulières précisées sur le devis.</p>
                <h3>4- Délais d&apos;exécution</h3>
                <p>Les délais sont donnés à titre indicatif et peuvent être ajustés selon la complexité du projet et la réactivité du Client dans la transmission des éléments nécessaires (textes, images, etc.).</p>
                <p>Tout retard dû à un manque de communication ou de validation du Client ne pourra être imputé à Skybound Studio.</p>
                <h3>5- Modalités de paiement</h3>
                <p>Le paiement s&apos;effectue par virement bancaire ou tout autre moyen accepté par Skybound Studio.</p>
                <p>En cas de retard de paiement, une pénalité correspondant à 10% du montant dû pourra être appliquée.</p>
                <h3>6- Propriété intellectuelle</h3>
                <p>Les créations réalisées par Skybound Studio restent sa propriété intellectuelle jusqu&apos;au paiement complet de la prestation.</p>
                <p>Après paiement intégral, les droits d&apos;utilisation sont cédés au Client pour les usages convenus.</p>
                <p>Skybound Studio se réserve le droit de mentionner ses réalisations dans son portfolio et supports de communication.</p>
                <h3>7- Responsabilité</h3>
                <p>Le Client est responsable du contenu (textes, images, vidéos…) qu&apos;il fournit et garantit qu&apos;il en détient les droits nécessaires.</p>
                <p>Skybound Studio ne pourra être tenu responsable d&apos;un mauvais fonctionnement du site dû à une mauvaise utilisation ou modification par le Client après livraison.</p>
                <h3>8- Rétractation et annulation</h3>
                <p>En cas d&apos;annulation par le Client après signature du devis, l&apos;acompte versé reste acquis à Skybound Studio.</p>
                <p>En cas d&apos;annulation en cours de réalisation, les travaux déjà effectués seront facturés au prorata.</p>
                <h3>9- Force majeure</h3>
                <p>Skybound Studio ne pourra être tenu responsable en cas d&apos;inexécution ou de retard dans l&apos;exécution de ses obligations dues à un cas de force majeure, notamment grève, catastrophe naturelle, incendie, panne informatique, ou tout autre événement hors de son contrôle.</p>
                <h3>10- Loi applicable et litiges</h3>
                <p>Les présentes CGV sont régies par le droit français.</p>
                <p>En cas de litige, une solution amiable sera privilégiée. À défaut, le tribunal compétent sera celui d&apos;Aix-en-Provence.</p>
            </section>
            <span
                className="material-icons cookie-icon"
                onClick={handleCookieSettings}
                title="Gérer mes cookies"
            >
                cookie
            </span>
        </main>
        </>
    );
}