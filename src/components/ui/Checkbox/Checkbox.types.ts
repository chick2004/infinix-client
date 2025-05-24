export default interface CheckboxProps {

    style?: React.CSSProperties;

    className?: string;

    label?: string;

    checked?: boolean;

    onChange?: (value: boolean) => void;

}