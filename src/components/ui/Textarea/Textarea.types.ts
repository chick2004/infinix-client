export default interface TextareaProps {

    style?: React.CSSProperties;

    className?: string;

    ref?: React.Ref<HTMLTextAreaElement>;

    value?: string;

    placeholder?: string;

    disabled?: boolean;

    rows?: number;

    onChange?: (value: string) => void;

    onClick?: (e: React.MouseEvent<HTMLElement>) => void;

}