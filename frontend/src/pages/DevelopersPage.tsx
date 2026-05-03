import AppLayout from "../layouts/AppLayout";

const pillars = [
  "Wallet-connected identity",
  "Trust and verification",
  "Interoperable services",
  "Growth analytics",
];

const DevelopersPage = () => {
  return (
    <AppLayout>
      <main className="home-page">
        <section className="home-hero">
          <div className="content-hero-grid">
            <div>
              <span className="home-kicker">SMAJ PI HUB BUILDERS</span>
              <h1>Developer Hub for Pi-Powered Products and Integrations</h1>
              <p>
                Build and connect modules into the ecosystem using shared wallet flow, trust standards, and service-first
                architecture patterns.
              </p>
            </div>
            <aside className="content-panel">
              <h3>Integration Flow</h3>
              <ol>
                <li>Register project endpoints.</li>
                <li>Connect wallet-auth profile hooks.</li>
                <li>Map lifecycle status events.</li>
                <li>Publish module for discovery.</li>
              </ol>
            </aside>
          </div>
        </section>

        <section className="home-section">
          <div className="home-section-head">
            <h2>Core Building Blocks</h2>
            <p>Keep every module consistent and trusted.</p>
          </div>
          <div className="home-service-grid">
            {pillars.map((pillar) => (
              <article key={pillar} className="home-service-card">
                <h3>{pillar}</h3>
              </article>
            ))}
          </div>
        </section>
      </main>
    </AppLayout>
  );
};

export default DevelopersPage;
