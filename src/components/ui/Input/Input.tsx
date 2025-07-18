import { memo } from "react";
import { TextInput } from "./TextInput";
import { PasswordInput } from "./PasswordInput";
import { NumberInput } from "./NumberInput";
import { SearchInput } from "./SearchInput";
import { DateInput } from "./DateInput";

import InputProps from "./Input.types";

export default memo(function Input({ type = "text", ...props }: InputProps) {
    switch (type) {
        case "password":
            return <PasswordInput {...props} />;
        case "number":
            return <NumberInput {...props} />;
        case "search":
            return <SearchInput {...props} />;
        case "date":
            return <DateInput {...props} />;
        default:
            return <TextInput {...props} />;
    }
})
