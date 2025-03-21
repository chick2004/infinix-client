import styles from "./Icon.module.css";

export function Icon({name, size = 24, type = "filled", className = ""}) {
    const classes = `
        ${styles[`icon-size-${size}`]}
        ${styles[`icon-${type}`]}
        ${styles[`icon-ic_fluent_${name}_${size}_${type}`]}
        ${className}
        `;
    return (
        <i className={classes}></i>
    );
}