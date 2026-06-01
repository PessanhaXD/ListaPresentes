import { useState } from "react";

import styles from "./ResumeGift.module.css";

export function ResumeGift({ setResumeCart, cartList }) {
  const total = cartList.reduce((sum, gift) => sum + gift.value, 0);

  const [payerName, setPayerName] = useState("");

  const [payerWhatsapp, setPayerWhatsapp] = useState("");

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Resumo da sua compra</h3>

      <div className={styles.content}>
        <div className={styles.orderSummary}>
          <div className={styles.totalRow}>
            <h4>Valor Total dos Presentes</h4>

            <h4>
              Total: R${" "}
              {total.toLocaleString("pt-BR", {
                minimumFractionDigits: Number.isInteger(total) ? 0 : 2,
                maximumFractionDigits: 2,
              })}
            </h4>
          </div>

          <div className={styles.giftsList}>
            {cartList.map((gift) => (
              <div key={gift.id} className={styles.giftRow}>
                <span>{gift.name}</span>

                <span>
                  R${" "}
                  {gift.value.toLocaleString("pt-BR", {
                    minimumFractionDigits: Number.isInteger(gift.value) ? 0 : 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.buyerInfo}>
          <div className={styles.inputGroup}>
            <h4>Seu nome</h4>

            <input
              type='text'
              placeholder='Seu nome'
              value={payerName}
              onChange={(e) => setPayerName(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <h4>Telefone</h4>

            <input
              type='tel'
              placeholder='21999999999'
              value={payerWhatsapp}
              onChange={(e) => setPayerWhatsapp(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.secondaryButton}
          onClick={() => setResumeCart(false)}
        >
          Voltar para o carrinho
        </button>

        <button className={styles.primaryButton}>Finalizar pedido</button>
      </div>
    </section>
  );
}
