import React, { useEffect, useState } from "react";

import styles from "./GiftList.module.css";

import { TitleSVG } from "../../components/title_svg/TitleSVG";

import { GiftGrid } from "../../components/gift-grid/GiftGrid";
import { Cart } from "../../components/cart/Cart.jsx";

import { list_gifts } from "../../services/gifts.js";

export function GiftList() {
  const [cart, setCart] = useState(false);
  const [cartList, setCartList] = useState([]);

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
  return (
    <section className={styles.container} id='gifts'>
      <TitleSVG title='LISTA DE PRESENTES' />

      {cart ? (
        <Cart setCart={setCart} cartList={cartList} setCartList={setCartList} />
      ) : (
        <GiftGrid
          setCart={setCart}
          gifts={gifts}
          loading={loading}
          error={error}
          cartList={cartList}
          setCartList={setCartList}
        />
      )}
    </section>
  );
}
