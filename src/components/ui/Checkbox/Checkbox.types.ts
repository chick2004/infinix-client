export default interface CheckboxProps {

    style?: React.CSSProperties;

    className?: string;

    ref?: React.Ref<HTMLLabelElement>;

    label?: string;

    checked?: boolean;

    onChange?: (value: boolean) => void;

}