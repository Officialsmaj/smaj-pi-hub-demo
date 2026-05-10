import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useAuthContext } from "../contexts/AuthContext";
import logoImage from "/logo.png";

const navItems = [
  { to: "/white-paper", label: "White Paper" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
];

const serviceMenuItems = [
  { to: "/services/store", label: "Commerce" },
  { to: "/services/jobs", label: "Jobs" },
  { to: "/services/health", label: "Health" },
  { to: "/services/education", label: "Education" },
  { to: "/services/transport", label: "Transport" },
  { to: "/services/stream", label: "Entertainment" },
  { to: "/services", label: "More Services \u2192" },
];

const publicSearchItems = [
  { label: "Services", to: "/services", keywords: ["services", "platform", "directory"] },
  { label: "Products Preview", to: "/services/store", keywords: ["product", "store", "commerce", "buy"] },
  { label: "Jobs Preview", to: "/services/jobs", keywords: ["jobs", "freelance", "apply"] },
  { label: "Courses", to: "/services/education", keywords: ["courses", "education", "learn"] },
  { label: "Health Services", to: "/services/health", keywords: ["health", "clinic", "care", "book"] },
  { label: "Events", to: "/services/events", keywords: ["events", "tickets"] },
  { label: "Help / FAQ", to: "/faq", keywords: ["help", "faq", "support"] },
  { label: "White Paper Topics", to: "/white-paper", keywords: ["white paper", "token", "roadmap", "ecosystem"] },
];

const rotatingSearchPhrases = [
  "Search jobs...",
  "Search products...",
  "Search transport...",
  "Search housing...",
  "Search Pi services...",
  "Search freelancers...",
  "Search healthcare...",
  "Search courses...",
  "Search events...",
  "Search sports...",
  "Search movies...",
  "Search charity...",
];

const trendingSearches = ["Jobs", "Phones", "Apartments", "Sports", "Food Delivery"];

const Header = () => {
  const { user, isAuthenticated, signIn, signOut, isLoading, authFeedback } = useAuthContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchPhraseIndex, setSearchPhraseIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchPanelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesMenuOpen(false);
    setIsSearchModalOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("smaj_recent_searches");
      if (stored) {
        setRecentSearches(JSON.parse(stored) as string[]);
      }
    } catch (_err) {
      // ignore local storage errors
    }
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsServicesMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSearchPhraseIndex((index) => (index + 1) % rotatingSearchPhrases.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isSearchModalOpen) {
      window.setTimeout(() => {
        searchInputRef.current?.focus();
      }, 120);
    }
  }, [isSearchModalOpen]);

  useEffect(() => {
    if (!isSearchModalOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchModalOpen(false);
      }
    };
    const onPointerDown = (event: MouseEvent) => {
      if (!searchPanelRef.current) {
        return;
      }
      const target = event.target as Node;
      if (!searchPanelRef.current.contains(target)) {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onPointerDown);
    };
  }, [isSearchModalOpen]);

  const saveRecentSearch = (term: string) => {
    const normalized = term.trim().toLowerCase();
    if (!normalized) {
      return;
    }
    const next = [normalized, ...recentSearches.filter((item) => item !== normalized)].slice(0, 3);
    setRecentSearches(next);
    try {
      window.localStorage.setItem("smaj_recent_searches", JSON.stringify(next));
    } catch (_err) {
      // ignore local storage errors
    }
  };

  const openSearchModal = () => {
    setSearchQuery("");
    setIsSearchModalOpen((open) => !open);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  const handleSearchSelect = (term: string, to?: string) => {
    saveRecentSearch(term);
    setIsSearchModalOpen(false);
    if (to) {
      navigate(to);
    }
  };

  const modalResults = publicSearchItems.filter((item) =>
    [item.label, ...item.keywords].join(" ").toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  return (
    <header className="smaj-header">
      <div className="smaj-header-inner">
        <NavLink to="/home" className="smaj-logo-link" aria-label="SMAJ PI HUB Home">
          <img src={logoImage} alt="SMAJ PI HUB Logo" className="smaj-logo" />
        </NavLink>
        <button
          type="button"
          className="smaj-public-search-mobile-toggle"
          aria-label="Open search"
          onClick={openSearchModal}
        >
          <SearchIcon fontSize="small" />
        </button>
        <button
          type="button"
          className="smaj-menu-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          <span className="smaj-menu-toggle-icon" aria-hidden="true">
            {isMobileMenuOpen ? <CloseIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
          </span>
        </button>
        <nav className={`smaj-nav ${isMobileMenuOpen ? "smaj-nav-open" : ""}`} aria-label="Primary">
          <button
            type="button"
            className="smaj-drawer-close"
            aria-label="Close navigation menu"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span>Close</span>
            <CloseIcon fontSize="small" />
          </button>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <div
            className={`smaj-services-menu ${isServicesMenuOpen ? "smaj-services-menu-open" : ""}`}
            onMouseEnter={() => setIsServicesMenuOpen(true)}
            onMouseLeave={() => setIsServicesMenuOpen(false)}
          >
            <button
              type="button"
              className="smaj-services-trigger"
              onClick={() => setIsServicesMenuOpen((open) => !open)}
              aria-expanded={isServicesMenuOpen}
              aria-label="Toggle services menu"
            >
              <span>Services</span>
              {isServicesMenuOpen ? <KeyboardArrowDownIcon fontSize="small" /> : <KeyboardArrowRightIcon fontSize="small" />}
            </button>
            <div className="smaj-services-dropdown" role="menu" aria-label="Services categories">
              {serviceMenuItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => {
                    setIsServicesMenuOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
          <div className="smaj-mobile-auth-sheet">
            {authFeedback ? (
              <p className={`smaj-auth-feedback smaj-auth-feedback-${authFeedback.type}`}>{authFeedback.message}</p>
            ) : null}
            {isAuthenticated && user ? (
              <div className="smaj-user-info">
                <span className="smaj-username">{user.username}</span>
                <button onClick={signOut} className="smaj-signout-btn" disabled={isLoading}>
                  Sign Out
                </button>
              </div>
            ) : (
              <button onClick={signIn} className="smaj-login-btn" disabled={isLoading}>
                <span className="smaj-login-icon" aria-hidden="true">
                  <LoginIcon fontSize="small" />
                </span>
                <span className="smaj-login-text">{isLoading ? "Signing in..." : "Login with Pi"}</span>
              </button>
            )}
          </div>
        </nav>
        {isMobileMenuOpen ? (
          <button
            type="button"
            aria-label="Close navigation menu"
            className="smaj-nav-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        ) : null}
        <div className="smaj-auth-section">
          <button type="button" className="smaj-auth-search-btn" aria-label="Open search" onClick={openSearchModal}>
            <SearchIcon fontSize="small" />
          </button>
          {isAuthenticated && user ? (
            <div className="smaj-user-info">
              <span className="smaj-username">{user.username}</span>
              <button onClick={signOut} className="smaj-signout-btn" disabled={isLoading}>
                Sign Out
              </button>
            </div>
          ) : (
            <button onClick={signIn} className="smaj-login-btn" disabled={isLoading}>
              <span className="smaj-login-icon" aria-hidden="true">
                <LoginIcon fontSize="small" />
              </span>
              <span className="smaj-login-text">{isLoading ? "Signing in..." : "Login with Pi"}</span>
            </button>
          )}
        </div>
      </div>
      {isSearchModalOpen ? (
        <div className="smaj-search-panel-anchor">
          <div ref={searchPanelRef} className="smaj-public-search-mobile-card smaj-search-card-enter">
            <div className="smaj-public-search-mobile-head">
              <h2>Search SMAJ PI HUB</h2>
              <button type="button" onClick={closeSearchModal} aria-label="Close search">
                <CloseIcon fontSize="small" />
              </button>
            </div>
            <div className="smaj-public-search-mobile-form">
              <div className="smaj-public-search-input-wrap">
                <span className="smaj-public-search-inline-icon" aria-hidden="true">
                  <SearchIcon fontSize="small" />
                </span>
                <input
                  type="search"
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={rotatingSearchPhrases[searchPhraseIndex]}
                />
              </div>
              <button type="button" className="smaj-public-search-cancel" onClick={closeSearchModal}>
                Cancel
              </button>
            </div>
            <p className="smaj-public-search-mobile-popular-title">Trending</p>
            <div className="smaj-public-search-mobile-popular">
              {trendingSearches.map((trend) => (
                <button key={trend} type="button" onClick={() => setSearchQuery(trend.toLowerCase())}>
                  • {trend}
                </button>
              ))}
            </div>
            <p className="smaj-public-search-mobile-popular-title">Popular Services</p>
            <div className="smaj-public-search-mobile-popular">
              <button type="button" onClick={() => handleSearchSelect("SMAJ STORE", "/services/store")}>• SMAJ STORE</button>
              <button type="button" onClick={() => handleSearchSelect("SMAJ PI JOBS", "/services/jobs")}>• SMAJ PI JOBS</button>
              <button type="button" onClick={() => handleSearchSelect("SMAJ PI STREAM", "/services/stream")}>• SMAJ PI STREAM</button>
            </div>
            <p className="smaj-public-search-mobile-popular-title">Recent Searches</p>
            <div className="smaj-public-search-mobile-popular">
              {recentSearches.length ? recentSearches.map((recent) => (
                <button key={recent} type="button" onClick={() => setSearchQuery(recent)}>
                  • {recent}
                </button>
              )) : <p className="smaj-public-search-empty">No recent searches yet.</p>}
            </div>
            <p className="smaj-public-search-mobile-popular-title">Popular:</p>
            <div className="smaj-public-search-mobile-popular">
              {(searchQuery.trim() ? modalResults : publicSearchItems).slice(0, 6).map((item) => (
                <button key={item.label} type="button" onClick={() => handleSearchSelect(item.label, item.to)}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      {authFeedback ? (
        <p className={`smaj-header-feedback smaj-auth-feedback smaj-auth-feedback-${authFeedback.type}`}>
          {authFeedback.message}
        </p>
      ) : null}
    </header>
  );
};

export default Header;
