import clsx from "clsx";
import React from "react";
import { Icon } from "@/components";
import FieldProps from "./Field.types";
import styles from "./Field.module.scss";

export default function Field({ className, validation_state, validation_message, ...props }: FieldProps) {

    const validation_icons = {
        success: <Icon name="checkmark_circle" size={16} type="filled" className={styles.success_color}/>,
        warning: <Icon name="warning" size={16} type="filled" className={styles.warning_color}/>,
        error: <Icon name="dismiss_circle" size={16} type="filled" className={styles.error_color}/>,
        info: <Icon name="info" size={16} type="filled" className={styles.info_color}/>
    }

    const validationIcon = validation_state ? validation_icons[validation_state] : null;

    const root = clsx(
        styles.root,
        className
    );

    return (
        <label className={root} {...props}>
            {props.label && <span className={styles.label}>{props.label}</span>}
            {props.children}
            {validation_message && (
                <p className={styles.validation_message}>
                    {validationIcon}
                    <span>{validation_message}</span>
                </p>
            )}
        </label>
    );
}