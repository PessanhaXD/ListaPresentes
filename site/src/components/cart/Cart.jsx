import React, { useEffect, useState } from "react";

import styles from "./Cart.module.css";

import weddingLogo from "../../assets/weddingLogo.png";

export function Cart({ setCart }) {
  const [defaultImage, setDefaultImage] = useState(weddingLogo);
  return (
    <div className={styles.container}>
      <h3>Meu carrinho</h3>
      <div className={styles.headerRow}>
        <h4>Descrição do presente</h4>
        <h4>valor</h4>
      </div>
      <div className={styles.cartItem}>
        <img className={styles.image} src={defaultImage} alt='' />
        <div className={styles.cartColumn}>
          <div className={styles.cartRow}>
            <h4>Title</h4>
            <h4>value</h4>
          </div>
          <button>Remover</button>
        </div>
      </div>
      <h4 className={styles.total}>Total</h4>
      <div className={styles.actions}>
        <button onClick={() => setCart(false)}>Adicionar mais itens</button>
        <button>Finalizar Pedido</button>
      </div>
    </div>
  );
}
