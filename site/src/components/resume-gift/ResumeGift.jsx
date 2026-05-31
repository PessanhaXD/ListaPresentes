import React, { useEffect, useState } from "react";

import styles from "./ResumeGift.module.css";

export function ResumeGift({ setResumeCart, cartList }) {
  const total = cartList.reduce((sum, gift) => sum + gift.value, 0);

  const [payerName, setPayerName] = useState("");
  const [payerWhatsapp, setPayerWhatsapp] = useState("");

  return (
    <>
      <h3 className={styles.title}>Resumo da sua compra</h3>
      <div className={styles.divisorRow}>
        <div className={styles.valuesInfo}>
          <div className={styles.total}>
            <h4>Valor Total dos Presentes</h4>
            <h4>
              Total: R${" "}
              {total.toLocaleString("pt-BR", {
                minimumFractionDigits: Number.isInteger(total) ? 0 : 2,
                maximumFractionDigits: 2,
              })}
            </h4>
          </div>
          <div>
            {cartList.map((gift) => (
              <div key={gift.id} className={styles.giftItem}>
                <span>{gift.name}</span>
                <span>
                  R${" "}
                  {gift.value.toLocaleString("pt-BR", {
                    minimumFractionDigits: Number.isInteger(total) ? 0 : 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.personalInfo}>
          <div>
            <input
              type='text'
              id='payerName'
              name='payerName'
              placeholder='Seu nome'
              value={payerName}
              onChange={(e) => setPayerName(e.target.value)}
              required
            />
          </div>
          <input
            type='tel'
            id='payerWhatsapp'
            name='payerWhatsapp'
            placeholder='21999999999'
            value={payerWhatsapp}
            onChange={(e) => setPayerWhatsapp(e.target.value)}
            required
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.actionsAdd}
          onClick={() => setResumeCart(false)}
        >
          Voltar para o Carrinho
        </button>

        <button className={styles.actionsFinish}>Finalizar Pedido</button>
      </div>
    </>
  );
}
