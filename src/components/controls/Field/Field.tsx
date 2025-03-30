import { useId, useMemo } from "react";
import React from "react";
import { Icon } from "@/components";

import FieldProps from "./Field.types";
import styles from "./Field.module.css";

export default function Field({children, label, validation_state = "info", validation_message}: FieldProps) {

    const id = useId();

    const validation_icons = {
        success: <Icon name="checkmark_circle" size={16} type="filled" className={styles.success_color}/>,
        warning: <Icon name="warning" size={16} type="filled" className={styles.warning_color}/>,
        error: <Icon name="dismiss_circle" size={16} type="filled" className={styles.error_color}/>,
        info: <Icon name="info" size={16} type="filled" className={styles.info_color}/>
    }

    const validationIcon = useMemo(() => validation_icons[validation_state], [validation_state]);

    return (
        <div className={styles.field}>
            {label && <label className={styles.label} htmlFor={id}>{label}</label>}
            {children && React.isValidElement(children) && React.cloneElement(children as React.ReactElement<any>, { id })}
            {validation_message && (
                <p className={styles.validation_message}>
                    {validationIcon}
                    <span>{validation_message}</span>
                </p>
            )}
        </div>
    );
}