import IconProps from "./Icon.types";
import styles from "./Icon.module.scss";

export default function Icon({name = "radio_button", size = 24, type = "regular", className, style}: IconProps) {

    const classes = `${styles[`icon-size-${size}`]} ${styles[`icon-${type}`]} ${styles[`icon-ic_fluent_${name}_${size}_${type}`]} ${className}`;

    return (
        <i className={classes} style={style}></i>
    );
}