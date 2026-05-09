import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import AppLayout from "../layouts/AppLayout";
import heroImage from "/smaj-hero.png";
import { useEventTracking } from "../hooks/useEventTracking";
import ActionButton from "../components/ActionButton";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";

const previewServices = [
  {
    name: "STORE",
    description: "Shop ecosystem products and services with Pi.",
    to: "/services/store",
    icon: <StorefrontOutlinedIcon fontSize="small" />,
  },
  {
    name: "JOBS",
    description: "Find opportunities and verified freelance work.",
    to: "/services/jobs",
    icon: <WorkOutlineOutlinedIcon fontSize="small" />,
  },
  {
    name: "HEALTH",
    description: "Discover care options and booking tools.",
    to: "/services/health",
    icon: <LocalHospitalOutlinedIcon fontSize="small" />,
  },
  {
    name: "EDU",
    description: "Access courses, mentorship, and upskilling.",
    to: "/services/edu",
    icon: <SchoolOutlinedIcon fontSize="small" />,
  },
  {
    name: "SPORTS",
    description: "Engage with fan utilities and sports services.",
    to: "/services/sports",
    icon: <SportsSoccerOutlinedIcon fontSize="small" />,
  },
  {
    name: "STREAM",
    description: "Watch and support creator-first streaming.",
    to: "/services/stream",
    icon: <LiveTvOutlinedIcon fontSize="small" />,
  },
];

const HomePage = () => {
  const trackEvent = useEventTracking();

  return (
    <AppLayout>
      <main className={styles.homePage}>
        <section className={styles.homeHero}>
          <div className={styles.homeHeroGrid}>
            <div>
              <span className={styles.homeKicker}>SMAJ PI HUB ECOSYSTEM</span>
              <h1>All Your Pi Services in One Place.</h1>
              <p>
                Connect once and access services like jobs, healthcare, education, transport, housing, charity, and
                more through Pi wallet access and expanding SMAJ Token utility.
              </p>
              <div className="home-hero-cta">
                <Link
                  to="/services"
                  onClick={() => trackEvent({ event: "home_cta_click", payload: { cta: "platform_directory" } })}
                >
                  Platform Directory
                </Link>
                <Link
                  to="/white-paper"
                  onClick={() => trackEvent({ event: "home_cta_click", payload: { cta: "read_white_paper" } })}
                >
                  Read White Paper
                </Link>
              </div>
              <div className="home-proof">
                <div>
                  <strong>Pi Native</strong>
                  <span>Built for Pi transactions</span>
                </div>
                <div>
                  <strong>Secure Flow</strong>
                  <span>Escrow and verified delivery</span>
                </div>
                <div>
                  <strong>Growing Hub</strong>
                  <span>More services launching</span>
                </div>
              </div>
            </div>

            <article className="home-hero-card">
              <img src={heroImage} alt="SMAJ PI HUB platform overview" />
              <div>
                <h3>Everything in one Pi ecosystem</h3>
                <p>Access real utility services from a single trusted platform.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="home-section">
          <div className="home-section-head">
            <h2>Services Preview</h2>
            <p>A quick look at key platforms in the SMAJ PI HUB ecosystem.</p>
          </div>
          <div className="home-service-grid">
            {previewServices.map((service) => (
              <article key={service.name} className="home-service-card">
                <p style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.6rem", color: "#5d4f80" }}>
                  {service.icon}
                  <strong>{service.name}</strong>
                </p>
                <p>{service.description}</p>
                <ActionButton to={service.to} variant="secondary">
                  Explore
                </ActionButton>
              </article>
            ))}
          </div>
          <p style={{ marginTop: "1rem" }}>
            <Link to="/services">View All Services &rarr;</Link>
          </p>
        </section>

        <section className="home-section">
          <div className="home-section-head">
            <h2>Why Users Trust SMAJ PI HUB</h2>
            <p>Designed for clarity, security, and real Pi utility.</p>
          </div>
          <div className="home-highlight-grid">
            <article className="home-highlight-card">
              <h3>Unified Wallet</h3>
              <p>Connect your Pi wallet once to access ecosystem services.</p>
            </article>
            <article className="home-highlight-card">
              <h3>Verified Escrow System</h3>
              <p>Secure transactions with built-in escrow protection.</p>
            </article>
            <article className="home-highlight-card">
              <h3>Pi-Powered Utility</h3>
              <p>Services and products payable in Pi.</p>
            </article>
            <article className="home-highlight-card">
              <h3>Global Access</h3>
              <p>Access services from anywhere.</p>
            </article>
          </div>
        </section>

        <section className="home-section">
          <div className="home-section-head">
            <h2>Trust & Verification</h2>
            <p>
              A multi-layered verification model is planned to reduce fraud, improve safety, and help users transact
              with confidence across the ecosystem.
            </p>
          </div>
          <div className="home-trust-grid">
            <article className="home-trust-card">
              <h3>KYC + Account Signals</h3>
              <p>Identity and account-level checks to strengthen platform credibility.</p>
            </article>
            <article className="home-trust-card">
              <h3>Escrow-First Payments</h3>
              <p>Transaction protection with milestone-based fund release patterns.</p>
            </article>
            <article className="home-trust-card">
              <h3>Reputation Layer</h3>
              <p>Ratings and history to help users choose reliable sellers and service providers.</p>
            </article>
          </div>
        </section>
      </main>
    </AppLayout>
  );
};

export default HomePage;
