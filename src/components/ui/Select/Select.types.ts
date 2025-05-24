export default interface SelectProps {

    options?: string[];

    disabled?: boolean;

    style?: React.CSSProperties;

    className?: string;

    onChange?: (value: string) => void;

    onClick?: () => void;

    onSelect?: (value: string) => void;

}