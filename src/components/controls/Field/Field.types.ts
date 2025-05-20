export default interface FieldProps {

    style?: React.CSSProperties;

    label?: string;

    validation_state?: "success" | "warning" | "error" | "info";

    validation_message?: string;
    
    children?: React.ReactNode;
}