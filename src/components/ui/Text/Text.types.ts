export default interface TextProps {

    style?: React.CSSProperties;

    className?: string;

    ref?: React.Ref<HTMLSpanElement>;

    appearance?: "text" | "accent_text" | "text_on_accent";

    type?: "caption" | "body" | "body_strong" | "body_large" | "subtitle" | "title" | "title_large" | "display";

    color?: "primary" | "secondary" | "tertiary" | "disabled";

    children?: React.ReactNode;

}