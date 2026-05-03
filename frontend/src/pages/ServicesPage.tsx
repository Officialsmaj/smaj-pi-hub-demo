import AppLayout from "../layouts/AppLayout";
import Card from "../components/Card";
import Section from "../components/Section";
import ActionButton from "../components/ActionButton";

const platforms = [
  ["SMAJ STORE", "Shop products and services with Pi.", "Ready Now"],
  ["SMAJ PI JOBS", "Find jobs and freelance opportunities.", "Coming Soon"],
  ["SMAJ PI HEALTH", "Book care and medical services.", "Coming Soon"],
  ["SMAJ PI EDU", "Learn skills from trusted mentors.", "Coming Soon"],
  ["SMAJ PI TRANSPORT", "Access mobility and ride services.", "Coming Soon"],
  ["SMAJ PI HOUSING", "Browse rental and housing options.", "Coming Soon"],
];

const ServicesPage = () => {
  return (
    <AppLayout>
      <main className="home-page">
        <Section variant="hero" className="home-hero">
          <div className="content-hero-grid">
            <div>
              <span className="home-kicker">ALL-IN-ONE PI SERVICE HUB</span>
              <h1>Access Every SMAJ Platform From One Place</h1>
              <p>
                Connect your wallet once and unlock ecosystem projects including e-commerce, digital services, and
                upcoming tools.
              </p>
              <div className="home-hero-cta">
                <ActionButton href="https://officialsmaj.github.io/smaj-ecosystem-dashboard/">
                  Open Unified Dashboard
                </ActionButton>
                <ActionButton to="/how-it-works" variant="secondary">
                  How It Works
                </ActionButton>
              </div>
            </div>
            <aside className="content-panel">
              <h3>Cross-Platform Access</h3>
              <p>One wallet, one identity, one user journey across connected SMAJ services.</p>
            </aside>
          </div>
        </Section>

        <Section className="home-section" title="Platform Directory" description="Choose where to go next.">
          <div className="home-service-grid">
            {platforms.map(([name, description, status]) => (
              <Card key={name} title={name}>
                <p>{description}</p>
                <span className="status-chip">{status}</span>
              </Card>
            ))}
          </div>
        </Section>
      </main>
    </AppLayout>
  );
};

export default ServicesPage;
