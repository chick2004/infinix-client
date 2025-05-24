export default interface RadioProps {

    style?: React.CSSProperties;

    className?: string;

    name?: string;

    label?: string;

    value?: string;

    checked?: boolean;

    onChange?: (value: string) => void;

}