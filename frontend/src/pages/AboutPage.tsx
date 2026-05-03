import AppLayout from "../layouts/AppLayout";
import Card from "../components/Card";
import Section from "../components/Section";

const AboutPage = () => {
  return (
    <AppLayout>
      <main className="home-page">
        <Section variant="hero" className="home-hero">
          <div className="content-hero-grid">
            <div>
              <span className="home-kicker">ABOUT SMAJ PI HUB</span>
              <h1>One Ecosystem. Real Pi Utility. Global Opportunity.</h1>
              <p>
                SMAJ PI HUB is a Pi-powered ecosystem where users connect once and access essential services including
                jobs, education, health, transport, housing, and charity.
              </p>
            </div>
            <aside className="content-panel">
              <h3>What We Stand For</h3>
              <ul>
                <li>Utility-first digital economy</li>
                <li>Global access for skills and services</li>
                <li>Secure and transparent platform flow</li>
                <li>Long-term ecosystem expansion</li>
              </ul>
            </aside>
          </div>
        </Section>

        <Section className="home-section">
          <div className="home-service-grid">
            <Card title="Mission">
              <p>
                Create real economic utility for Pi by building a trusted platform where users and providers transact
                and grow together.
              </p>
            </Card>
            <Card title="Vision">
              <p>
                Empower a borderless ecosystem where anyone can use their skills and services to generate sustainable
                opportunity.
              </p>
            </Card>
            <Card title="Trust">
              <p>Ensure secure transactions, transparent process, and reliable standards across every service flow.</p>
            </Card>
          </div>
        </Section>
      </main>
    </AppLayout>
  );
};

export default AboutPage;
