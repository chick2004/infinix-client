export default interface ToggleSwitchProps {

    label?: string;

    checked?: boolean;

    onChange?: (value: boolean) => void;

    disabled?: boolean;
}