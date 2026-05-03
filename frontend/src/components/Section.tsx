import type { ReactNode } from "react";
import styles from "./Section.module.css";

type SectionProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  variant?: "default" | "hero";
};

const Section = ({ children, title, description, className = "", variant = "default" }: SectionProps) => {
  const variantClass = variant === "hero" ? styles.hero : "";

  return (
    <section className={`${styles.section} ${variantClass} ${className}`.trim()}>
      {title || description ? (
        <div className={styles.head}>
          {title ? <h2>{title}</h2> : null}
          {description ? <p className={styles.description}>{description}</p> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
};

export default Section;
