export default interface DialogProps {

    children?: React.ReactNode;

    style?: React.CSSProperties;

    className?: string;

    ref?: React.Ref<HTMLDivElement>;

    stroke?: boolean;

    shadow?: boolean;

    appearance?: "base" | "base_alt" | "secondary" | "tertiary" | "quaternary" | "quinary" | "senary";

}