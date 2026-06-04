import { useEffect, useState } from "react";

import styles from "./Countdown.module.css";

import { getCountdown } from "../../utils/date";

import { CountdownCard } from "../../components/countdown-card/CountdownCard";

export function Countdown() {
  const wedding_date = "2026-11-15T17:00:00";

  const [countdown, setCountdown] = useState(getCountdown(wedding_date));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(wedding_date));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.container}>
      <h2 className={styles.textCountdown}>FALTAM APENAS</h2>
      <div className={styles.countdown}>
        <CountdownCard value={countdown.days} unit='DIAS' />
        <CountdownCard value={countdown.hours} unit='HORAS' />
        <CountdownCard value={countdown.minutes} unit='MINUTOS' />
        <CountdownCard value={countdown.seconds} unit='SEGUNDOS' />
      </div>
    </section>
  );
}
