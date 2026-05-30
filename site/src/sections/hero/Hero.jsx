import React from "react";

import weddingLogo from "../../assets/weddingLogo.png";

import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.container} id='hero'>
      <div className={styles.overlay}>
        {/* Conteúdo */}
        <div className={styles.dataname}>
          <h1>Rafael e Vitória</h1>
          <h3>Enlace</h3>
        </div>
      </div>

      <img className={styles.logo} src={weddingLogo} alt='' />

      <svg
        className={styles.wave}
        viewBox='0 0 1440 120'
        preserveAspectRatio='none'
      >
        <path
          fill='#ffffff'
          d='
            M0,64
            C120,120 240,20 360,64
            C480,100 600,30 720,64
            C840,100 960,20 1080,64
            C1200,110 1320,30 1440,64
            L1440,120
            L0,120
            Z
          '
        />
      </svg>
    </section>
  );
}
