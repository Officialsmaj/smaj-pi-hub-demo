import Header from "../components/Header";

const Shop = () => {
  return (
    <>
      <Header />

      <main className="home-page">
        <section className="home-hero">
          <div className="home-hero-grid">
            <div>
              <span className="home-kicker">SMAJ PI HUB ECOSYSTEM</span>
              <h1>All Your Pi Services in One Place.</h1>
              <p>
                Connect once and access services like jobs, healthcare, education, transport, housing, charity, and
                more through Pi wallet access and expanding SMAJ Token utility.
              </p>
              <div className="home-hero-cta">
                <button type="button">Platform Directory</button>
                <button type="button">Read White Paper</button>
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
              <img src="/smaj-hero.png" alt="SMAJ PI HUB platform overview" />
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
            <p>A glimpse into our ecosystem.</p>
          </div>
          <div className="home-service-grid">
            <article className="home-service-card">
              <h3>PI Jobs</h3>
              <p>Freelance and job opportunities.</p>
            </article>
            <article className="home-service-card">
              <h3>SMAJ STORE</h3>
              <p>Buy products and services with Pi.</p>
            </article>
            <article className="home-service-card">
              <h3>Healthcare</h3>
              <p>Medical discovery and booking tools.</p>
            </article>
            <article className="home-service-card">
              <h3>Education</h3>
              <p>Learning, upskilling, and mentorship.</p>
            </article>
            <article className="home-service-card">
              <h3>Transport</h3>
              <p>Mobility services and rides.</p>
            </article>
            <article className="home-service-card">
              <h3>Housing</h3>
              <p>Property listings and rental support.</p>
            </article>
          </div>
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
      </main>
      <footer className="smaj-footer">
        <div className="smaj-footer-grid">
          <div>
            <h4>SMAJ PI HUB</h4>
            <p>Built for Pi wallet access, with SMAJ Token utility expanding across the ecosystem.</p>
          </div>
          <div>
            <h4>Platform</h4>
            <a href="/">Home</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">White Paper</a>
            <a href="#">Pricing</a>
            <a href="#">FAQ</a>
            <a href="#">Contact</a>
          </div>
          <div>
            <h4>Programs</h4>
            <a href="#">Affiliate Program</a>
            <a href="#">Collaborate With Us</a>
            <a href="#">Partners</a>
            <a href="#">Community</a>
            <a href="#">Developers</a>
          </div>
          <div>
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Cookie Policy</a>
            <a href="#">Report Abuse</a>
          </div>
        </div>
        <p className="smaj-copyright">&copy; 2026 SMAJ PI HUB. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Shop;
