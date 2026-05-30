import { useState } from "react";

import styles from "./CardProduct.module.css";

import { InputIncrement } from "@/components/ui/input-increment/InputIncrement";
import { PiShoppingCartThin } from "react-icons/pi";

import { TextPrice } from "@/components/ui/text-price/TextPrice";

export function CardProduct({
  product,
  description,
  variations,
  price,
  image,
  onClickImg,
  onClick,
}) {
  const [quantity, setQuantity] = useState(1);

  const [integer, cents] = Number(price).toFixed(2).split(".");

  return (
    <>
      <div className={styles.card}>
        <button className={styles.buttonImage} onClick={onClickImg}>
          <img className={styles.productPhoto} src={image} alt='' />
        </button>
        <div className={styles.infosProduct}>
          <h3>{product}</h3>

          <TextPrice className='globalPrice' integer={integer} cents={cents} />
          <div className={styles.actions}>
            <InputIncrement value={quantity} onChange={setQuantity} />
            <button
              className={styles.buttonCart}
              onClick={() => onClick(quantity)}
            >
              Carrinho <PiShoppingCartThin />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
