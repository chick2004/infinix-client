export default interface DropdownSearchProps {

    value?: string;

    suggestions: string[];

    placeholder?: string;

    disabled?: boolean;

    onChange?: (value: string) => void;

    onSearch?: (value: string) => void;

}
