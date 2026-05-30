import React, { useEffect, useState } from "react";

import styles from "./GiftList.module.css";

import { TitleSVG } from "../../components/title_svg/TitleSVG";
import { list_gifts } from "../../services/gifts.js";

export function GiftList() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGifts() {
      try {
        setLoading(true);

        const data = await list_gifts();

        console.log("DATA:", data);

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

  return (
    <div className={styles.container}>
      <TitleSVG title='LISTA DE PRESENTES' />

      <div className={styles.actions}>
        <button>Carrinho</button>

        <h3>Ordenar a lista por:</h3>
      </div>

      {loading && <p>Carregando presentes...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <div className={styles.gifts}>
          {gifts.map((gift) => (
            <div key={gift.id} className={styles.card}>
              <h3>{gift.name}</h3>

              <p>{gift.description}</p>

              <span>R$ {Number(gift.value).toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
