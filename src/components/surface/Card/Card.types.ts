export default interface CardProps {

    className?: string;

    style?: React.CSSProperties;

    ref?: React.Ref<HTMLDivElement>;

    stroke?: boolean;

    shadow?: boolean;

    appearance?: "default" | "secondary" | "tertiary";

    children?: React.ReactNode;

}