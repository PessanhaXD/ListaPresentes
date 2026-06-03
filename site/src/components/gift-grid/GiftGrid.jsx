import { useState } from "react";

import styles from "./GiftGrid.module.css";

import { PiShoppingCartThin } from "react-icons/pi";

import { CardProduct } from "../card-product/CardProduct";
import { SortSelect } from "../sort-select/SortSelect";

export function GiftGrid({
  setCart,
  gifts,
  loading,
  error,
  cartList,
  setCartList,
}) {
  const [sortBy, setSortBy] = useState("default");

  function openCart() {
    setCart(true);
  }

  const sortedGifts = [...gifts];

  switch (sortBy) {
    case "price_asc":
      sortedGifts.sort((a, b) => a.value - b.value);
      break;

    case "price_desc":
      sortedGifts.sort((a, b) => b.value - a.value);
      break;

    case "name_asc":
      sortedGifts.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case "name_desc":
      sortedGifts.sort((a, b) => b.name.localeCompare(a.name));
      break;

    default:
      break;
  }

  return (
    <>
      <div className={styles.actions}>
        <button disabled={cartList.length === 0} onClick={openCart}>
          <PiShoppingCartThin />
          Carrinho
        </button>

        <div className={styles.sortArea}>
          <h3>Ordenar a lista por:</h3>

          <SortSelect value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      {loading && (
        <p style={{ textAlign: "center" }}>Carregando presentes...</p>
      )}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <div className={styles.gifts}>
          {sortedGifts.map((gift) => (
            <CardProduct
              key={gift.id}
              {...gift}
              onClick={() => {
                setCartList((prev) => [
                  ...prev,
                  {
                    ...gift,
                    cartId: crypto.randomUUID(),
                  },
                ]);

                setCart(true);
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
