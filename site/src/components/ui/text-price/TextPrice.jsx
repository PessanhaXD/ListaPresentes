import React from "react";
import styles from "./TextPrice.module.css";

export function TextPrice({ integer, cents, className, classNameCents }) {
  return (
    <div className={[styles.price, className].filter(Boolean).join(" ")}>
      <span>R$ {integer},</span>
      <span
        className={[styles.cents, classNameCents].filter(Boolean).join(" ")}
      >
        {cents}
      </span>
    </div>
  );
}
