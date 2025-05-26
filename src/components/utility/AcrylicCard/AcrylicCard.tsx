import AcrylicCardProps from "./AcrylicCard.types";
import styles from "./AcrylicCard.module.scss";

export default function AcrylicCard({children, style, className}: AcrylicCardProps) {
    return (
        <div className={`${styles.card} ${className}`} style={style}>
            {children}
        </div>
    );
}