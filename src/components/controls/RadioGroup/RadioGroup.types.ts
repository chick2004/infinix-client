export default interface RadioGroupProps {

    name?: string;

    label?: string;

    value?: string;

    options?: Array<{ label: string; value: string }>;

    style?: React.CSSProperties;

    onChange?: (value: string) => void;

}