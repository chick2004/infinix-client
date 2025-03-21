import { useId, useMemo } from "react";
import React from "react";

import styles from "./Field.module.css";
import { Icon } from "@/components";

export function Field({children, label, validation_state = "info", validation_message}) {

    const id = useId();

    const validation_icons = {
        success: <Icon name="checkmark_circle" size={16} type="filled" className="text-system-success"/>,
        warning: <Icon name="warning" size={16} type="filled" className="text-system-caution"/>,
        error: <Icon name="dismiss_circle" size={16} type="filled" className="text-system-critical"/>,
        info: <Icon name="info" size={16} type="filled" className="text-system-attention"/>
    }

    const validationIcon = useMemo(() => validation_icons[validation_state], [validation_state]);

    return (
        <div className={styles.field}>
            {label && <label className={styles.label} htmlFor={id}>{label}</label>}
            {children && React.isValidElement(children) && React.cloneElement(children, { id })}
            {validation_message && (
                <p className={styles.validation_message}>
                    {validationIcon}
                    <span>{validation_message}</span>
                </p>
            )}
        </div>
    );
}