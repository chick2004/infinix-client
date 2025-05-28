export default interface IconProps {

    name: string;

    size?: 16 | 20 | 24 | 28 | 32 | 40;

    type?: "filled" | "regular";

    className?: string;

    style?: React.CSSProperties;
}