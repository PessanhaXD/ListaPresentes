import styles from "./SearchGift.module.css";

export function SearchGift({ value, onChange }) {
  return (
    <input
      className={styles.input}
      type='text'
      placeholder='Buscar presente...'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
