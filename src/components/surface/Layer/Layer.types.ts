export default interface LayerProps {

    className?: string;

    style?: React.CSSProperties;

    ref?: React.Ref<HTMLDivElement>;

    stroke?: boolean;

    appearance?: "default" | "alt" | "on_acrylic";

    children?: React.ReactNode;

}