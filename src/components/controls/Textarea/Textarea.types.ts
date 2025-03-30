export default interface TextareaProps {

    value?: string;

    placeholder?: string;

    disabled?: boolean;

    rows?: number;

    onChange?: (value: string) => void;

    onClick?: (e: React.MouseEvent<HTMLElement>) => void;

}