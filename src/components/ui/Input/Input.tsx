import { TextInput } from "./TextInput";
import { PasswordInput } from "./PasswordInput";
import { NumberInput } from "./NumberInput";
import { SearchInput } from "./SearchInput";
import { DateInput } from "./DateInput";

import InputProps from "./Input.types";

export default function Input({ type = "text", disabled = false, ...props }: InputProps) {
    switch (type) {
        case "password":
            return <PasswordInput disabled={disabled} {...props} />;
        case "number":
            return <NumberInput disabled={disabled} {...props} />;
        case "search":
            return <SearchInput disabled={disabled} {...props} />;
        case "date":
            return <DateInput disabled={disabled} {...props} />;
        default:
            return <TextInput disabled={disabled} {...props} />;
    }
}
