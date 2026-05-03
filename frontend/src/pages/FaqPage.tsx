import { useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { useEventTracking } from "../hooks/useEventTracking";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
  linkToContact?: boolean;
};

const faqItems: FaqItem[] = [
  {
    id: "what-is-smaj",
    question: "What is SMAJ PI HUB?",
    answer: "SMAJ PI HUB is one place to access services, shops, and community tools.",
  },
  {
    id: "getting-started",
    question: "How do I get started?",
    answer: "Connect your wallet, then explore services that match your needs.",
  },
  {
    id: "service-types",
    question: "What services can I use?",
    answer: "Jobs, education, health, transport, housing, and more in one hub.",
  },
  {
    id: "support",
    question: "How do I get support?",
    answer: "Use our contact page and the team will respond quickly.",
    linkToContact: true,
  },
];

const FaqPage = () => {
  const [openId, setOpenId] = useState<string>(faqItems[0]?.id ?? "");
  const trackEvent = useEventTracking();

  const toggleItem = (id: string) => {
    setOpenId((current) => {
      const next = current === id ? "" : id;
      trackEvent({ event: "faq_toggle", payload: { faq_id: id, is_open: next === id } });
      return next;
    });
  };

  return (
    <AppLayout>
      <main className="home-page">
        <section className="home-hero">
          <span className="home-kicker">HELP CENTER</span>
          <h1>Frequently Asked Questions</h1>
          <p>Quick answers to help you start, explore services, and get support.</p>
        </section>

        <section className="home-section">
          <div className="faq-list" role="list">
            {faqItems.map((item) => {
              const isOpen = openId === item.id;
              return (
                <article key={item.id} className="faq-item" role="listitem">
                  <button
                    type="button"
                    className="faq-question"
                    aria-expanded={isOpen}
                    onClick={() => toggleItem(item.id)}
                  >
                    {item.question}
                  </button>
                  {isOpen ? (
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                      {item.linkToContact ? (
                        <Link
                          to="/contact"
                          onClick={() => trackEvent({ event: "faq_contact_cta_click", payload: { source: "faq" } })}
                        >
                          Contact Support
                        </Link>
                      ) : null}
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </AppLayout>
  );
};

export default FaqPage;
