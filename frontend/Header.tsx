import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
// import axios from 'axios'; // No longer needed as auth logic is centralized in useAuth
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BoltIcon from '@mui/icons-material/Bolt';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import styles from './Header.module.css';
import { useAuth } from './src/hooks/useAuth'; // Import the useAuth hook

const Header: React.FC = () => {
  const { user, isLoading, signIn, signOut } = useAuth(); // Use the auth hook
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  // Detect desktop width and auto-close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      if (desktop && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Check initially and on resize
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (isMenuOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Replaced with signIn from useAuth
  const handlePiLogin = async () => {
    closeMenu(); // Close mobile menu if open
    await signIn(); // Call signIn from useAuth
  };

  // Replaced with signOut from useAuth
  const handleLogout = async () => {
    await signOut(); // Call signOut from useAuth
    closeMenu();
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
          {isLoading ? (
            <div className={styles.loader} />
          ) : user ? (
            <div className={styles.userContainer}>
              <div className={styles.userInfo} onClick={toggleUserMenu}>
                <AccountCircleIcon />
                <span>{user.username}</span>
              </div>
              
              {isUserMenuOpen && (
                <div className={styles.userDropdown}>
                  <Link to="/profile" onClick={closeMenu}>My Profile</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <button className={styles.piLoginBtn} onClick={handlePiLogin}>
              <BoltIcon /> 
              <span>Login with Pi</span>
            </button>
          )}

          {/* Hamburger Menu Toggle */}
          <button 
            className={styles.menuToggle} 
            onClick={toggleMenu} 
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
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