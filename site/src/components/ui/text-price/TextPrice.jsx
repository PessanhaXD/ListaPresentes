import React from "react";
import styles from "./TextPrice.module.css";

export function TextPrice({ integer, cents, className, classNameCents }) {
  return (
    <div className={`${styles.price} ${className}`}>
      <span className={styles.integer}>R$ {integer},</span>

      <span className={`${styles.cents} ${classNameCents}`}>{cents}</span>
    </div>
  );
}
