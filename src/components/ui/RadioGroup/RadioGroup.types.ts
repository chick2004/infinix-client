export default interface RadioGroupProps {

    style?: React.CSSProperties;

    className?: string;

    name?: string;

    label?: string;

    value?: string;

    options?: Array<{ label: string; value: string }>;

    onChange?: (value: string) => void;

}