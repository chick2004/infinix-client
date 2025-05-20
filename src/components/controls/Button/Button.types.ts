export default interface ButtonProps {

    style?: React.CSSProperties;

    appearance?: "accent" | "standard" | "subtle" | "transparent";

    type?: "button" | "submit" | "reset";

    children: React.ReactNode;

    disabled?: boolean;

    onClick?: () => void;

}