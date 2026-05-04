import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import PrivacyTipOutlinedIcon from "@mui/icons-material/PrivacyTipOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import CookieOutlinedIcon from "@mui/icons-material/CookieOutlined";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import smajEcosystemLogo from "../../../smaj_ecosystem_logo.png";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className="smaj-footer">
      <div className="smaj-footer-grid">
        <div>
          <h4>SMAJ PI HUB</h4>
          <p>Built for Pi wallet access, with SMAJ Token utility expanding across the ecosystem.</p>
        </div>
        <div>
          <h4>Platform</h4>
          <Link to="/home"><HomeOutlinedIcon fontSize="small" />Home</Link>
          <Link to="/about"><InfoOutlinedIcon fontSize="small" />About</Link>
          <Link to="/services"><DesignServicesOutlinedIcon fontSize="small" />Services</Link>
          <Link to="/white-paper"><DescriptionOutlinedIcon fontSize="small" />White Paper</Link>
          <Link to="/pricing"><SellOutlinedIcon fontSize="small" />Pricing</Link>
          <Link to="/faq"><HelpOutlineOutlinedIcon fontSize="small" />FAQ</Link>
          <Link to="/contact"><MailOutlineOutlinedIcon fontSize="small" />Contact</Link>
        </div>
        <div>
          <h4>Programs</h4>
          <Link to="/affiliate"><GroupAddOutlinedIcon fontSize="small" />Affiliate Program</Link>
          <Link to="/collaborate"><Diversity3OutlinedIcon fontSize="small" />Collaborate With Us</Link>
          <Link to="/partners"><HandshakeOutlinedIcon fontSize="small" />Partners</Link>
          <Link to="/community"><ForumOutlinedIcon fontSize="small" />Community</Link>
          <Link to="/developers"><CodeOutlinedIcon fontSize="small" />Developers</Link>
        </div>
        <div>
          <h4>Legal</h4>
          <Link to="/privacy"><PrivacyTipOutlinedIcon fontSize="small" />Privacy Policy</Link>
          <Link to="/terms"><GavelOutlinedIcon fontSize="small" />Terms & Conditions</Link>
          <Link to="/cookies"><CookieOutlinedIcon fontSize="small" />Cookie Policy</Link>
          <Link to="/report-abuse"><ReportGmailerrorredOutlinedIcon fontSize="small" />Report Abuse</Link>
        </div>
      </div>
<p className="smaj-copyright">&copy; 2026 SMAJ PI HUB. All rights reserved.</p>
      <div className={styles.poweredBy}>
        <a href="/" className={styles.logoLink} aria-label="SMAJ Ecosystem">
          <img src={smajEcosystemLogo} alt="SMAJ Ecosystem Logo" className={styles.logoImg} />
        </a>
        <p className={styles.poweredText}>
          <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>⚡</span>
          <span>Part of the SMAJ Ecosystem • Powered by SMAJ</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
