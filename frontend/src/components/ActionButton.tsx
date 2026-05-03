import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import styles from "./ActionButton.module.css";

type ActionButtonProps = {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

const ActionButton = ({ to, href, children, variant = "primary", className = "" }: ActionButtonProps) => {
  const classes = `${styles.base} ${variant === "primary" ? styles.primary : styles.secondary} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return null;
};

export default ActionButton;
