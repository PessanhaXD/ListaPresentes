import React from "react";

import styles from "./CountdownCard.module.css";

export function CountdownCard({ value, unit }) {
  const formattedValue = String(value).padStart(2, "0");

  return (
    <div className={styles.container}>
      <h3 className={styles.value}>{formattedValue}</h3>
      <h3 className={styles.unit}>{unit}</h3>
    </div>
  );
}
