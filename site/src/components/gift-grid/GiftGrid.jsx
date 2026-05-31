import React, { useEffect, useState } from "react";

import styles from "./GiftGrid.module.css";

import { PiShoppingCartThin } from "react-icons/pi";

import { CardProduct } from "../card-product/CardProduct";

export function GiftGrid({
  setCart,
  gifts,
  loading,
  error,
  cartList,
  setCartList,
}) {
  return (
    <>
      <div className={styles.actions}>
        <button disabled={cartList.length === 0}>
          <PiShoppingCartThin /> Carrinho
        </button>

        <h3>Ordenar a lista por:</h3>
      </div>

      {loading && (
        <p style={{ textAlign: "center" }}>Carregando presentes...</p>
      )}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <div className={styles.gifts}>
          {gifts.map((gift) => (
            <CardProduct
              key={gift.id}
              {...gift}
              onClick={() => {
                setCartList((prev) => [...prev, gift]);
                setCart(true);
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
