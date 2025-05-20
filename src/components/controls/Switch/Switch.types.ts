export default interface SwitchProps {

    label?: string;

    checked?: boolean;

    disabled?: boolean;

    style?: React.CSSProperties;

    onChange?: (value: boolean) => void;
}