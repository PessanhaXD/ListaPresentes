import React, { useEffect, useState } from "react";

import styles from "./GiftGrid.module.css";

import { PiShoppingCartThin } from "react-icons/pi";
import { list_gifts } from "../../services/gifts.js";

import { CardProduct } from "../../components/card-product/CardProduct.jsx";

export function GiftGrid({ setCart }) {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGifts() {
      try {
        setLoading(true);

        const data = await list_gifts();

        if (Array.isArray(data)) {
          setGifts(data);
        } else {
          console.error("Resposta inesperada:", data);
          setError("Resposta inválida da API.");
        }
      } catch (error) {
        console.error("Erro ao buscar presentes:", error);
        setError("Não foi possível carregar os presentes.");
      } finally {
        setLoading(false);
      }
    }

    loadGifts();
  }, []);
  const [quantity, setQuantity] = useState(0);

  return (
    <>
      <div className={styles.actions}>
        <button disabled={quantity === 0}>
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
              onClick={() => setCart(true)}
            />
          ))}
        </div>
      )}
    </>
  );
}
