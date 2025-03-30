export default interface SelectProps {

    options?: string[];

    disabled?: boolean;

    onChange?: (value: string) => void;

    onClick?: () => void;

    onSelect?: (value: string) => void;

}