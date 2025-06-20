export default interface InputProps {

    style?: React.CSSProperties;

    className?: string;

    ref?: React.Ref<HTMLInputElement>;

    type?: "text" | "password" | "number" | "search" | "date";

    value?: string;

    name?: string;

    disabled?: boolean;

    placeholder?: string;

    min?: number;

    max?: number;

    step?: number;

    onClick?: () => void;

    onChange?: (value: string) => void;

    onKeyDown?: (key: string) => void;

    onSearch?: (value: string) => void;

}