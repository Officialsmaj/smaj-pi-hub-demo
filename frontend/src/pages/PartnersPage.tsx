import AppLayout from "../layouts/AppLayout";

const partnerNames = ["Alibaba", "AliExpress", "Amazon", "Future Strategic Partner"];

const PartnersPage = () => {
  return (
    <AppLayout>
      <main className="home-page">
        <section className="home-hero">
          <span className="home-kicker">PARTNERSHIPS</span>
          <h1>Our Trusted Partners</h1>
          <p>Global pioneers joining SMAJ PI HUB. Partner showcases are rolling out in phases.</p>
        </section>

        <section className="home-section">
          <div className="home-service-grid">
            {partnerNames.map((partner) => (
              <article key={partner} className="home-service-card">
                <h3>{partner}</h3>
                <p>Partnership profile and collaboration scope coming soon.</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </AppLayout>
  );
};

export default PartnersPage;
