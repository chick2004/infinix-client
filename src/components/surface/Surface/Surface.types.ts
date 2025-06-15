export default interface SurfaceProps {

    className?: string;

    style?: React.CSSProperties;

    ref?: React.Ref<HTMLDivElement>;

    stroke?: boolean;

    shadow?: boolean;

    appearance?: "base" | "base_alt" | "secondary" | "tertiary" | "quaternary" | "quinary" | "senary";

    children?: React.ReactNode;
}