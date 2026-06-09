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
      <div className={styles.content}>
        <h3 className={styles.messageTitle}>Obrigado pelo presente! ❤️</h3>
        <h3 className={styles.messageCongratulations}>
          Receber o carinho de pessoas tão especiais torna esse momento ainda
          mais inesquecível. Cada gesto, palavra e lembrança farão parte com
          muito amor do início da nossa nova história.
        </h3>
        <h3 className={styles.messageName}>Rafael & Vitória</h3>
      </div>

      <button className={styles.button} onClick={returnCartList}>
        Voltar a lista de presentes
      </button>
    </section>
  );
}
