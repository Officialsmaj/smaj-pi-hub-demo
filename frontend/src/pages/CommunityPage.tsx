import AppLayout from "../layouts/AppLayout";

const threadCategories = ["Ecosystem", "Marketplace", "Security", "Guides", "Community"];

const latestThreads = [
  "How SMAJ PI HUB makes multi-project access easier for daily users",
  "Trusted marketplace checklist for Pi buyers and sellers",
  "Wallet safety thread: verification steps every pioneer should follow",
  "Regional ambassador thread: local growth ideas and outreach plans",
];

const CommunityPage = () => {
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
            <p>Popular categories and trending topics.</p>
          </div>
          <div className="home-service-grid">
            {threadCategories.map((category) => (
              <article key={category} className="home-service-card">
                <h3>{category}</h3>
                <p>Follow trusted discussions and updates in {category.toLowerCase()}.</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-section">
          <div className="home-section-head">
            <h2>Latest Threads</h2>
          </div>
          <div className="home-service-grid">
            {latestThreads.map((thread) => (
              <article key={thread} className="home-highlight-card">
                <h3>{thread}</h3>
              </article>
            ))}
          </div>
        </section>
      </main>
    </AppLayout>
  );
};

export default CommunityPage;
