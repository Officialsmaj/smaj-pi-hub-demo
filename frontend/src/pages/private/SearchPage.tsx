import { Link, useSearchParams } from "react-router-dom";
import { privateSearchItems, privateSearchPopular } from "../../content/privateSearch";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim().toLowerCase();
  const results = privateSearchItems.filter((item) =>
    [item.label, ...item.keywords].join(" ").toLowerCase().includes(query),
  );

  return (
    <main className="private-page">
      <section className="private-card">
        <p className="private-kicker">SEARCH SMAJ PI HUB</p>
        <h1>Search Results</h1>
        <p>Query: {query || "Popular topics"}</p>
      </section>

      <section className="private-card">
        <h2>Results</h2>
        {query && !results.length ? <p>No results found for this query.</p> : null}
        <div className="private-grid">
          {(query ? results : privateSearchItems).map((item) => (
            <Link key={item.label} to={item.to} className="private-link-card">
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="private-card">
        <h2>Popular</h2>
        <div className="private-grid">
          {privateSearchPopular.map((item) => (
            <Link key={item.label} to={item.to} className="private-link-card">
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default SearchPage;
