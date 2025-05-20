export default interface CheckboxProps {

    style?: React.CSSProperties;

    label?: string;

    checked?: boolean;

    onChange?: (value: boolean) => void;

}