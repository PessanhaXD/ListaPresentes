import React, { useEffect, useState } from "react";

import styles from "./GiftList.module.css";

import { TitleSVG } from "../../components/title_svg/TitleSVG";

import { GiftGrid } from "../../components/gift-grid/GiftGrid";
import { Cart } from "../../components/cart/Cart";

export function GiftList() {
  const [cart, setCart] = useState(false);
  return (
    <section className={styles.container} id='gifts'>
      <TitleSVG title='LISTA DE PRESENTES' />

      {cart ? <Cart setCart={setCart} /> : <GiftGrid setCart={setCart} />}
    </section>
  );
}
