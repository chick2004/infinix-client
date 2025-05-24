export default interface SwitchProps {

    label?: string;

    checked?: boolean;

    disabled?: boolean;

    style?: React.CSSProperties;

    className?: string;

    onChange?: (value: boolean) => void;
}