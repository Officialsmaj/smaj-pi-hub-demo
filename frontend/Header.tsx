import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handlePiLogin = async () => {
    try {
      const scopes = ['username', 'payments'];
      
      // Callback for incomplete payments found during auth
      const onIncompletePaymentFound = (payment: any) => {
        console.log('Incomplete payment found:', payment);
        // Implementation details in FLOWS.md
      };

      const authResponse = await (window as any).Pi.authenticate(scopes, onIncompletePaymentFound);
      console.log('Pi Auth Success:', authResponse);
      setUser(authResponse.user);
      
      // Phase 6: Call your backend /signin endpoint here
    } catch (err) {
      console.error('Pi Authentication failed:', err);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link to="/" className={styles.logoLink} onClick={closeMenu}>
          <img src="/logo.png" alt="SMAJ PI HUB Logo" className={styles.logo} />
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/white-paper">White Paper</NavLink>
          <NavLink to="/how-it-works">How It Works</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/faq">FAQ</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <div className={styles.headerActions}>
          {user ? (
            <div className={styles.userInfo}>
              <i className='bx bxs-user-circle'></i>
              <span>{user.username}</span>
            </div>
          ) : (
            <button className={styles.piLoginBtn} onClick={handlePiLogin}>
              <i className='bx bxs-bolt'></i> Login with Pi
            </button>
          )}

          {/* Hamburger Menu Toggle */}
          <button 
            className={styles.menuToggle} 
            onClick={toggleMenu} 
            aria-label="Toggle Menu"
          >
            <i className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && <div className={styles.menuOverlay} onClick={closeMenu} />}

      {/* Mobile Navigation Drawer */}
      <nav className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`}>
        <div className={styles.mobileNavLinks}>
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/about" onClick={closeMenu}>About</NavLink>
          <NavLink to="/services" onClick={closeMenu}>Services</NavLink>
          <NavLink to="/white-paper" onClick={closeMenu}>White Paper</NavLink>
          <NavLink to="/how-it-works" onClick={closeMenu}>How It Works</NavLink>
          <NavLink to="/pricing" onClick={closeMenu}>Pricing</NavLink>
          <NavLink to="/faq" onClick={closeMenu}>FAQ</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;