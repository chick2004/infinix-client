export default interface ToggleSwitchProps {

    label?: string;

    value?: boolean;

    checked?: boolean;

    onChange?: (value: boolean) => void;

    disabled?: boolean;
}