import React from "react";

import styles from "./GiftList.module.css";

import { TitleSVG } from "../../components/title_svg/TitleSVG";

export function GiftList() {
  return (
    <div className={styles.container}>
      <TitleSVG title='LISTA DE PRESENTES' />

      <div className={styles.actions}>
        <button>Carrinho</button>

        <h3>Ordernar a lista por: </h3>
      </div>
    </div>
  );
}
