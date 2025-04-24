export default interface RadioProps {

    name?: string;

    label?: string;

    value?: string;

    checked?: boolean;

    onChange?: (value: string) => void;

}