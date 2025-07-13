export default interface SpinnerProps {

    style?: React.CSSProperties;

    className?: string;

    ref?: React.Ref<HTMLDivElement>;

    size?: "small" | "medium" | "large";
}