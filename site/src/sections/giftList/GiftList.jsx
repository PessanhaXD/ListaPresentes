import React, { useEffect, useState } from "react";

import styles from "./GiftList.module.css";

import { TitleSVG } from "../../components/title_svg/TitleSVG";

import { list_gifts } from "../../services/gifts.js";

export function GiftList() {
  const [gifts, setGifts] = useState([]);
  useEffect(() => {
    fetch("https://listapresentes.onrender.com/gifts/")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className={styles.container}>
      <TitleSVG title='LISTA DE PRESENTES' />

      <div className={styles.actions}>
        <button>Carrinho</button>

        <h3>Ordernar a lista por: </h3>
      </div>
    </div>
  );
}
