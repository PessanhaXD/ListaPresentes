import { useEffect, useState } from "react";

import styles from "./ResumeGift.module.css";

import { create_payment } from "../../services/payments";

import { ThankYou } from "../thank-you/ThankYou";

export function ResumeGift({ setResumeCart, cartList }) {
  const total = cartList.reduce((sum, gift) => sum + gift.value, 0);

  const [payerName, setPayerName] = useState("");

  const [payerWhatsapp, setPayerWhatsapp] = useState("");

  const [payerMessage, setPayerMessage] = useState("");

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState("");

  const [loading, setLoading] = useState(false);

  const [checkoutId, setCheckoutId] = useState("");

  const [paymentApproved, setPaymentApproved] = useState(false);

  async function payment_create() {
    if (loading) return;

    setMessage("");

    try {
      const gift_ids = cartList.map((gift) => gift.id);

      if (!payerName.trim() || !payerWhatsapp.trim()) {
        setMessage("Todos os campos precisam ser preenchidos");

        setMessageType("error");

        return;
      }

      setLoading(true);

      const response = await create_payment(
        gift_ids,
        payerName,
        payerWhatsapp,
        payerMessage,
      );

      if (!response.success) {
        setMessage(response.error);

        setMessageType("error");

        return;
      }

      setCheckoutId(response.checkout_id);

      setMessage("Redirecionando para o pagamento...");

      setMessageType("success");

      window.open(response.payment_url, "_blank");
    } catch (error) {
      console.error(error);

      setMessage("Erro ao gerar pagamento");

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!checkoutId) return;

    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/payments/status/${checkoutId}`,
        );

        const data = await response.json();

        if (data.approved) {
          setPaymentApproved(true);

          clearInterval(interval);
        }
      } catch (error) {
        console.error(error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [checkoutId]);

  if (paymentApproved) {
    return <ThankYou />;
  }

  return (
    <section className={styles.container}>
      {" "}
      <h3 className={styles.title}>Resumo da sua compra </h3>
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

          <div className={styles.inputGroup}>
            <h4>Mensagem aos noivos (opcional)</h4>

            <textarea
              placeholder='Deixe uma mensagem para os noivos...'
              value={payerMessage}
              onChange={(e) => setPayerMessage(e.target.value)}
            />
          </div>
        </div>
      </div>
      {message && (
        <p
          className={
            messageType === "success"
              ? styles.successMessage
              : styles.errorMessage
          }
        >
          {message}
        </p>
      )}
      <div className={styles.actions}>
        <button
          className={styles.secondaryButton}
          onClick={() => setResumeCart(false)}
        >
          Voltar para o carrinho
        </button>

        <button
          className={styles.primaryButton}
          onClick={payment_create}
          disabled={loading}
        >
          {loading ? "Gerando pagamento..." : "Finalizar pedido"}
        </button>
      </div>
    </section>
  );
}
