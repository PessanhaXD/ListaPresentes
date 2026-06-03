import styles from "./SortSelect.module.css";

export function SortSelect({ value, onChange }) {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value='default'>Padrão</option>
      <option value='price_asc'>Menor preço</option>
      <option value='price_desc'>Maior preço</option>
      <option value='name_asc'>A-Z</option>
      <option value='name_desc'>Z-A</option>
    </select>
  );
}
