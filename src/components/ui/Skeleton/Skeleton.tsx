import SkeletonProps from "./Skeleton.types";
import styles from "./Skeleton.module.scss";

export default function Skeleton({ style, className, ref, appearance = "opaque", animation="wave" }: SkeletonProps) {
    return (
        <div ref={ref} className={`${styles.skeleton} ${className} ${appearance == "opaque" ? styles.opaque : styles.translucent} ${animation == "wave" ? styles.wave : styles.pulse}`} style={style} >
        </div>
    );
}