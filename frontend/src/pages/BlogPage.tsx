import { Link } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { blogPosts, featuredBlogPost } from "../content/blog";

const BlogPage = () => {
  return (
    <AppLayout>
      <main className="home-page">
        <section className="home-hero">
          <div className="content-hero-grid">
            <div>
              <span className="home-kicker">SMAJ PI HUB INSIGHTS</span>
              <h1>News, Guides, and Real Pi Utility Stories</h1>
              <p>Follow product updates, ecosystem announcements, onboarding guides, and practical use-cases.</p>
            </div>
            {featuredBlogPost ? (
              <aside className="content-panel">
                <h3>Featured</h3>
                <p>{featuredBlogPost.title}</p>
                <Link to={`/blog/${featuredBlogPost.slug}`}>Read Featured Story</Link>
              </aside>
            ) : null}
          </div>
        </section>

        <section className="home-section">
          <div className="home-section-head">
            <h2>Latest Articles</h2>
          </div>
          <div className="home-service-grid">
            {blogPosts.map((post) => (
              <article key={post.slug} className="home-service-card">
                <p className="home-kicker">{post.category}</p>
                <h3>{post.title}</h3>
                <p>{post.snippet}</p>
                <p>{post.readTime}</p>
                <Link to={`/blog/${post.slug}`}>Read Article</Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </AppLayout>
  );
};

export default BlogPage;
