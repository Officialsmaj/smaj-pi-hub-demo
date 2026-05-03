import { useMemo, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { useEventTracking } from "../hooks/useEventTracking";

type ThreadCategory = "ecosystem" | "marketplace" | "security" | "guides" | "community";

type Thread = {
  id: string;
  title: string;
  category: ThreadCategory;
};

const threadCategories: Array<{ key: "all" | ThreadCategory; label: string }> = [
  { key: "all", label: "All" },
  { key: "ecosystem", label: "Ecosystem" },
  { key: "marketplace", label: "Marketplace" },
  { key: "security", label: "Security" },
  { key: "guides", label: "Guides" },
  { key: "community", label: "Community" },
];

const threads: Thread[] = [
  {
    id: "thread-1",
    title: "How SMAJ PI HUB makes multi-project access easier for daily users",
    category: "ecosystem",
  },
  {
    id: "thread-2",
    title: "Trusted marketplace checklist for Pi buyers and sellers",
    category: "marketplace",
  },
  {
    id: "thread-3",
    title: "Wallet safety thread: verification steps every pioneer should follow",
    category: "security",
  },
  {
    id: "thread-4",
    title: "New user onboarding guide: from first visit to first Pi transaction",
    category: "guides",
  },
  {
    id: "thread-5",
    title: "Regional ambassador thread: local growth ideas and outreach plans",
    category: "community",
  },
];

const CommunityPage = () => {
  const [activeCategory, setActiveCategory] = useState<"all" | ThreadCategory>("all");
  const trackEvent = useEventTracking();

  const filteredThreads = useMemo(() => {
    if (activeCategory === "all") {
      return threads;
    }

    return threads.filter((thread) => thread.category === activeCategory);
  }, [activeCategory]);

  return (
    <AppLayout>
      <main className="home-page">
        <section className="home-hero">
          <div className="content-hero-grid">
            <div>
              <span className="home-kicker">GLOBAL PIONEER NETWORK</span>
              <h1>Build, Learn, and Grow with the SMAJ PI HUB Community</h1>
              <p>
                Join discussions, discover real Pi utility updates, and collaborate with pioneers, merchants, and
                contributors across the ecosystem.
              </p>
            </div>
            <aside className="content-panel">
              <h3>Community Snapshot</h3>
              <p>30K+ members, 120+ weekly threads, and always-on peer support.</p>
            </aside>
          </div>
        </section>

        <section className="home-section">
          <div className="home-section-head">
            <h2>Explore Conversations</h2>
            <p>Filter trending threads by category.</p>
          </div>
          <div className="home-hero-cta" role="tablist" aria-label="Thread categories">
            {threadCategories.map((category) => {
              const isActive = activeCategory === category.key;
              return (
                <button
                  key={category.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setActiveCategory(category.key);
                    trackEvent({
                      event: "community_category_filter",
                      payload: { category: category.key },
                    });
                  }}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </section>

        <section className="home-section">
          <div className="home-section-head">
            <h2>Latest Threads</h2>
          </div>
          <div className="home-service-grid">
            {filteredThreads.map((thread) => (
              <article key={thread.id} className="home-highlight-card">
                <p className="home-kicker">{thread.category}</p>
                <h3>{thread.title}</h3>
              </article>
            ))}
          </div>
        </section>
      </main>
    </AppLayout>
  );
};

export default CommunityPage;
