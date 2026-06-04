import React from "react";

import styles from "./Information.module.css";

import { TitleSVG } from "../../components/title_svg/TitleSVG";

import coupleImage from "../../assets/coupleImage.jpg";
import leafImage from "../../assets/leafImage.png";

export function Information() {
  return (
    <section className={styles.container} id='home'>
      <TitleSVG title='UM NOVO COMEÇO' />

      <div className={styles.content}>
        <div className={styles.textFull}>
          <h2>
            Estamos prontos para celebrar o início de uma nova etapa das nossas
            vidas.
          </h2>
          <div className={styles.text}>
            <p>
              Criamos este espaço com muito carinho para compartilhar um dos
              momentos mais especiais das nossas vidas e celebrar, ao lado de
              pessoas queridas, o início de uma nova etapa.
            </p>
            <p>
              Depois de tantos momentos vividos juntos, chegou a hora de
              transformar nossa história em um novo capítulo. Aqui vocês
              encontrarão todas as informações sobre o nosso casamento,
              incluindo local, horário, lista de presentes e confirmação de
              presença.
            </p>
            <h2 className={styles.web}>
              Obrigado por prestigiar o começo dessa nova história
              <br />
              <span className={styles.heart}>♡</span>
            </h2>
          </div>
        </div>
        <img className={styles.image} src={coupleImage} alt='' />
        <img className={styles.imageDecorator} src={leafImage} alt='' />
        <h2 className={styles.mobile}>
          Obrigado por prestigiar o começo dessa nova história
          <br />
          <span className={styles.heart}>♡</span>
        </h2>
      </div>
    </section>
  );
}
