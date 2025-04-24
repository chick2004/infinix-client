export default interface RadioGroupProps {

    name?: string;

    label?: string;

    value?: string;

    options?: Array<{ label: string; value: string }>;

    onChange?: (value: string) => void;

}