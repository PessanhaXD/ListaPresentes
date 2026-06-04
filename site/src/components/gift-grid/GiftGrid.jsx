import { useState } from "react";

import styles from "./GiftGrid.module.css";

import { PiShoppingCartThin } from "react-icons/pi";

import { CardProduct } from "../card-product/CardProduct";
import { SortSelect } from "../sort-select/SortSelect";
import { SearchGift } from "../search-gift/SearchGift";

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

  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  const filteredGifts = gifts.filter((gift) =>
    gift.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedGifts = [...filteredGifts];

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

        <SearchGift value={searchTerm} onChange={setSearchTerm} />

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
          {sortedGifts.slice(0, visibleCount).map((gift) => (
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
      {visibleCount < sortedGifts.length && (
        <div className={styles.showMoreArea}>
          <button onClick={() => setVisibleCount((prev) => prev + 8)}>
            Mostrar mais presentes
          </button>
        </div>
      )}
    </>
  );
}
