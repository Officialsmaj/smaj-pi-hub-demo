import { Link, useParams } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import { blogPosts } from "../content/blog";

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <AppLayout>
        <main className="home-page">
          <section className="home-section">
            <div className="home-section-head">
              <h1>Post Not Found</h1>
              <p>The requested article is not available.</p>
              <Link to="/blog">Back to Blog</Link>
            </div>
          </section>
        </main>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <main className="home-page">
        <section className="home-hero">
          <span className="home-kicker">{post.category}</span>
          <h1>{post.title}</h1>
          <p>
            {post.author} · {post.readTime} · {post.date}
          </p>
        </section>

        <section className="home-section">
          <article className="content-panel" style={{ maxWidth: 960 }}>
            {post.content.map((block, index) => {
              if (block.type === "heading") {
                return <h2 key={index}>{block.text}</h2>;
              }
              if (block.type === "paragraph") {
                return <p key={index}>{block.text}</p>;
              }
              if (block.type === "quote") {
                return <blockquote key={index}>{block.text}</blockquote>;
              }
              if (block.type === "list") {
                return (
                  <ul key={index}>
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <ol key={index}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              );
            })}
            <Link to="/blog">Back to Blog</Link>
          </article>
        </section>
      </main>
    </AppLayout>
  );
};

export default BlogPostPage;
