import React, { useEffect, useState } from "react";

import styles from "./Cart.module.css";

import weddingLogo from "../../assets/weddingLogo.png";

import { TextPrice } from "../ui/text-price/TextPrice";

export function Cart({ setCart, cartList, setCartList }) {
  const defaultImage = weddingLogo;

  const total = cartList.reduce((sum, gift) => sum + gift.value, 0);

  function removeGift(cartId) {
    const updatedList = cartList.filter((gift) => gift.cartId !== cartId);

    setCartList(updatedList);

    if (updatedList.length === 0) {
      setCart(false);
    }
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Meu carrinho</h3>

      <div className={styles.headerRow}>
        <h4>Descrição do presente</h4>
        <h4>Valor</h4>
      </div>

      <div className={styles.cartItems}>
        {cartList.map((gift) => {
          const [integer, cents] = Number(gift.value).toFixed(2).split(".");

          return (
            <div key={gift.id} className={styles.cartItem}>
              <img
                className={styles.image}
                src={gift.image || defaultImage}
                alt=''
              />

              <div className={styles.cartColumn}>
                <div className={styles.cartRow}>
                  <h4>{gift.name}</h4>

                  <TextPrice
                    className={styles.valueGift}
                    classNameCents={styles.ValueGiftCents}
                    integer={integer}
                    cents={cents}
                  />
                </div>

                <button onClick={() => removeGift(gift.cartId)}>Remover</button>
              </div>
            </div>
          );
        })}
      </div>

      <h4 className={styles.total}>
        Total: R${" "}
        {total.toLocaleString("pt-BR", {
          minimumFractionDigits: Number.isInteger(total) ? 0 : 2,
          maximumFractionDigits: 2,
        })}
      </h4>

      <div className={styles.actions}>
        <button className={styles.actionsAdd} onClick={() => setCart(false)}>
          Adicionar mais itens
        </button>

        <button className={styles.actionsFinish}>Finalizar Pedido</button>
      </div>
    </div>
  );
}
