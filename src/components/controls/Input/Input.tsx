import { TextInput } from "./TextInput";
import { PasswordInput } from "./PasswordInput";
import { NumberInput } from "./NumberInput";
import { SearchInput } from "./SearchInput";

import InputProps from "./Input.types";

export default function Input({ type = "text", disabled = false, ...rest }: InputProps) {
    switch (type) {
        case "text":
            return <TextInput disabled={disabled} {...rest} />;
        case "password":
            return <PasswordInput disabled={disabled} {...rest} />;
        case "number":
            return <NumberInput disabled={disabled} {...rest} />;
        case "search":
            return <SearchInput disabled={disabled} {...rest} />;
        default:
            return null;
    }
}
