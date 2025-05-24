export default interface FieldProps {

    style?: React.CSSProperties;

    className?: string;

    label?: string;

    validation_state?: "success" | "warning" | "error" | "info";

    validation_message?: string;
    
    children?: React.ReactNode;
}