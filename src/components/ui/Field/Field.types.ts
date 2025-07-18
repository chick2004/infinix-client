import { ComponentPropsWithRef } from "react";
export default interface FieldProps extends ComponentPropsWithRef<"label"> {

    label?: string;

    validation_state?: "success" | "warning" | "error" | "info" | undefined;

    validation_message?: string;
    
}