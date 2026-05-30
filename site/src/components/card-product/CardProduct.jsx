import { useState } from "react";

import styles from "./CardProduct.module.css";

import { TextPrice } from "../ui/text-price/TextPrice";

import defaultImage from "../../assets/weddingLogo.png";

export function CardProduct({ name, description, value, image }) {
  const imageGift = image || defaultImage;
  const [integer, cents] = Number(value).toFixed(2).split(".");

  return (
    <>
      <div className={styles.card}>
        <button className={styles.buttonImage}>
          <img className={styles.productPhoto} src={imageGift} alt='' />
        </button>
        <div className={styles.infosProduct}>
          <h3>{name}</h3>

          <div className={styles.textPrice}>
            <TextPrice
              className={styles.price}
              integer={integer}
              cents={cents}
            />
          </div>

          <div className={styles.actions}>
            <button className={styles.buttonCart}>Presentear</button>
          </div>
        </div>
      </div>
    </>
  );
}
