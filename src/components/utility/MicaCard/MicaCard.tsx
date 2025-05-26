import MicaCardProps from "./MicaCard.types";
import styles from "./MicaCard.module.scss";

export default function MicaCard({children, style, className}: MicaCardProps) {
    return (
        <div className={`${styles.card} ${className}`} style={style}>
            {children}
        </div>
    );
}