export default interface RadioProps {

    style?: React.CSSProperties;

    className?: string;

    ref?: React.Ref<HTMLLabelElement>;

    name: string;

    label?: string;

    value: string;

    checked?: boolean;

    onChange?: (value: string) => void;

}