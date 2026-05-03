import type { ReactNode } from "react";
import styles from "./Card.module.css";

type CardProps = {
  title?: string;
  children?: ReactNode;
  className?: string;
};

const Card = ({ title, children, className = "" }: CardProps) => {
  return (
    <article className={`${styles.card} ${className}`.trim()}>
      {title ? <h3 className={styles.title}>{title}</h3> : null}
      {typeof children === "string" ? <p className={styles.body}>{children}</p> : children}
    </article>
  );
};

export default Card;
