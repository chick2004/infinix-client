export default interface ButtonProps {

    children: React.ReactNode;

    appearance?: "accent" | "standard" | "subtle" | "transparent";

    type?: "button" | "submit" | "reset";

    disabled?: boolean;

    className?: string;

    onClick?: () => void;

}