const Header = () => {
  return (
    <header className="smaj-header">
      <div className="smaj-header-inner">
        <a href="/" className="smaj-logo-link" aria-label="SMAJ PI HUB Home">
          <img src="/logo.png" alt="SMAJ PI HUB Logo" className="smaj-logo" />
        </a>
        <nav className="smaj-nav" aria-label="Primary">
          <a href="/">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">White Paper</a>
          <a href="#">How It Works</a>
          <a href="#">Pricing</a>
          <a href="#">FAQ</a>
          <a href="#">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
