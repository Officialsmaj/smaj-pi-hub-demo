import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { blogPosts, featuredBlogPost } from "../content/blog";
import { useEventTracking } from "../hooks/useEventTracking";

const BlogPage = () => {
  const trackEvent = useEventTracking();
  const [activeTag, setActiveTag] = useState("all");
  const [query, setQuery] = useState("");

  const tags = useMemo(() => {
    const categoryAndTags = blogPosts.flatMap((post) => [post.category, ...post.tags]);
    const unique = Array.from(new Set(categoryAndTags));
    return ["all", ...unique];
  }, []);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return blogPosts.filter((post) => {
      const matchesTag =
        activeTag === "all" || post.category === activeTag || post.tags.some((tag) => tag === activeTag);

      if (!matchesTag) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchableText = [
        post.title,
        post.snippet,
        post.author,
        post.category,
        post.tags.join(" "),
        post.content.map((block) => ("text" in block ? block.text : block.items.join(" "))).join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [activeTag, query]);

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
                <Link
                  to={`/blog/${featuredBlogPost.slug}`}
                  onClick={() => trackEvent({ event: "blog_featured_click", payload: { slug: featuredBlogPost.slug } })}
                >
                  Read Featured Story
                </Link>
              </aside>
            ) : null}
          </div>
        </section>

        <section className="home-section">
          <div className="home-section-head">
            <h2>Latest Articles</h2>
            <p>Search and filter posts by category or tag.</p>
          </div>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles, guides, updates"
            aria-label="Search blog posts"
          />
          <div className="home-hero-cta">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                aria-pressed={activeTag === tag}
                onClick={() => {
                  setActiveTag(tag);
                  trackEvent({ event: "blog_tag_filter", payload: { tag } });
                }}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="home-service-grid">
            {filteredPosts.map((post) => (
              <article key={post.slug} className="home-service-card">
                <p className="home-kicker">{post.category}</p>
                <h3>{post.title}</h3>
                <p>{post.snippet}</p>
                <p>{post.readTime}</p>
                <Link
                  to={`/blog/${post.slug}`}
                  onClick={() => trackEvent({ event: "blog_article_click", payload: { slug: post.slug } })}
                >
                  Read Article
                </Link>
              </article>
            ))}
          </div>
          {filteredPosts.length === 0 ? <p>No posts matched your search.</p> : null}
        </section>
      </main>
    </AppLayout>
  );
};

export default BlogPage;
