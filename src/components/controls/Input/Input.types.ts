export default interface InputProps {

    type?: "text" | "password" | "number" | "search";

    value?: string | number;

    name?: string;

    disabled?: boolean;

    placeholder?: string;

    min?: number;

    max?: number;

    step?: number;

    onClick?: () => void;

    onChange?: (value: string | number) => void;

    onKeyDown?: (key: string) => void;

    onSearch?: (value: string | number) => void;

}