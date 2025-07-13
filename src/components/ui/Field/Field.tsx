import clsx from "clsx";
import { useId } from "react";
import React from "react";
import { Icon } from "@/components";
import FieldProps from "./Field.types";
import styles from "./Field.module.scss";

export default function Field({ style, className, ref, label, validation_state = "info", validation_message, children }: FieldProps) {

    const id = useId();

    const validation_icons = {
        success: <Icon name="checkmark_circle" size={16} type="filled" className={styles.success_color}/>,
        warning: <Icon name="warning" size={16} type="filled" className={styles.warning_color}/>,
        error: <Icon name="dismiss_circle" size={16} type="filled" className={styles.error_color}/>,
        info: <Icon name="info" size={16} type="filled" className={styles.info_color}/>
    }

    const validationIcon = validation_icons[validation_state];

    const root = clsx(
        styles.root,
        className
    );

    return (
        <div style={style} className={root} ref={ref}>
            {label && <label className={styles.label} htmlFor={id}>{label}</label>}
            {children && React.isValidElement(children) && React.cloneElement(children, { id } as React.Attributes)}
            {validation_message && (
                <p className={styles.validation_message}>
                    {validationIcon}
                    <span>{validation_message}</span>
                </p>
            )}
        </div>
    );
}