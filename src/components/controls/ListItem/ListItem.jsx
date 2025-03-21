import styles from "./ListItem.module.css";

export default function ListItem({children, key, disabled = false, is_active = false}) {
    return (
        <li key={key} className={`${styles.list_item} ${is_active ? styles.active : ""}`}>
            {children}
        </li>
    );
}