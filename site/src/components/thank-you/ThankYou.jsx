import React from "react";

import styles from "./ThankYou.module.css";

export function ThankYou({ setCartList, setCart, setCheckoutId }) {
  function returnCartList() {
    setCartList([]);
    setCart(false);
    setCheckoutId("");
  }
  return (
    <section className={styles.container}>
      <h3 className={styles.messageCongratulations}>
        <span className={styles.messageTitle}>
          Obrigado pelo presente! ❤️ <br />
        </span>
        Seu carinho faz parte desse momento tão especial. <br />
        <span className={styles.messageName}>Rafael & Vitória</span>
      </h3>

      <button className={styles.button} onClick={returnCartList}>
        Voltar a lista de presentes
      </button>
    </section>
  );
}
