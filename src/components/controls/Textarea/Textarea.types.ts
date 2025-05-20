export default interface TextareaProps {

    value?: string;

    placeholder?: string;

    disabled?: boolean;

    rows?: number;

    style?: React.CSSProperties;

    onChange?: (value: string) => void;

    onClick?: (e: React.MouseEvent<HTMLElement>) => void;

}