import React, { useState } from "react";

import styles from "./Cart.module.css";

import weddingLogo from "../../assets/weddingLogo.png";

import { CartList } from "../cart-list/CartList";
import { ResumeGift } from "../resume-gift/ResumeGift";

export function Cart({ setCart, cartList, setCartList }) {
  const defaultImage = weddingLogo;

  const [resumeCart, setResumeCart] = useState(false);

  return (
    <div className={styles.container}>
      {resumeCart ? (
        <ResumeGift setResumeCart={setResumeCart} cartList={cartList} />
      ) : (
        <CartList
          setCart={setCart}
          cartList={cartList}
          setCartList={setCartList}
          setResumeCart={setResumeCart}
        />
      )}
    </div>
  );
}
