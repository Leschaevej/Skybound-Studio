import "./page.scss";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="intro">
          <h2>Propulsez votre présence digitale avec légèreté et précision.</h2>
          <p>Studio créatif spécialisé en design et développement web.</p>
        </div>
        <div className="action">
            <button>Services</button>
            <button>Projects</button>
            <button>Contact</button>
          </div>
      </section>
    </main>
  );
}
