import Link from 'next/link';
import { robotoSerif } from './font';
import './globals.scss';
import './not-found.scss';

export default function NotFound() {
    return (
        <main className="notFound">
            <h1 className={robotoSerif.className}>404</h1>
            <h2>Houston, nous avons un problème...</h2>
            <p>
                La page que vous cherchez a décollé vers une autre galaxie.
                Retournons à la base pour reprendre la mission.
            </p>
            <Link href="/" className="back">
                Retour à la base
            </Link>
        </main>
    );
}