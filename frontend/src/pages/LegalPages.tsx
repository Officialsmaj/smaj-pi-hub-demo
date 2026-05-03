import { useState } from "react";
import type { FormEvent } from "react";
import AppLayout from "../layouts/AppLayout";

export const PrivacyPage = () => (
  <AppLayout>
    <main className="home-page">
      <section className="home-section">
        <div className="home-section-head">
          <h1>Privacy Policy</h1>
          <p>How SMAJ PI HUB collects, uses, and protects your account and transaction information.</p>
        </div>
        <article className="home-highlight-card">
          <p>We only collect data required to run wallet-connected services, account security, and support operations.</p>
          <p>We do not sell personal data and we use access controls for sensitive records.</p>
        </article>
      </section>
    </main>
  </AppLayout>
);

export const TermsPage = () => (
  <AppLayout>
    <main className="home-page">
      <section className="home-section">
        <div className="home-section-head">
          <h1>Terms &amp; Conditions</h1>
          <p>Usage rules for SMAJ PI HUB services, transactions, and ecosystem participation.</p>
        </div>
        <article className="home-highlight-card">
          <p>Users must provide accurate account information and follow platform transaction and safety guidelines.</p>
          <p>Abuse, fraud, or attempts to bypass safeguards may result in service restrictions.</p>
        </article>
      </section>
    </main>
  </AppLayout>
);

export const CookiesPage = () => (
  <AppLayout>
    <main className="home-page">
      <section className="home-section">
        <div className="home-section-head">
          <h1>Cookie Policy</h1>
          <p>Cookies are used for session continuity, preferences, and service performance insights.</p>
        </div>
        <article className="home-highlight-card">
          <p>You can control cookie behavior through your browser settings.</p>
          <p>Disabling some cookies may affect wallet session and account experience.</p>
        </article>
      </section>
    </main>
  </AppLayout>
);

export const ReportAbusePage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <AppLayout>
      <main className="home-page">
        <section className="home-section contact-grid">
          <form onSubmit={handleSubmit} className="contact-form">
            <h1>Report Abuse</h1>
            <label htmlFor="report-name">Name</label>
            <input id="report-name" type="text" required />
            <label htmlFor="report-email">Email</label>
            <input id="report-email" type="email" required />
            <label htmlFor="report-details">Report Details</label>
            <textarea id="report-details" rows={6} required />
            <button type="submit">Submit Report</button>
            {submitted ? <p>Thank you. Your report has been submitted.</p> : null}
          </form>
        </section>
      </main>
    </AppLayout>
  );
};
