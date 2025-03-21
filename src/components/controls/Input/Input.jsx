import { TextInput } from "@/components/controls/Input/TextInput";
import { PasswordInput } from "@/components/controls/Input/PasswordInput";
import { NumberInput } from "@/components/controls/Input/NumberInput";
import { SearchInput } from "@/components/controls/Input/SearchInput";

export function Input({type = "text", ...rest}) {

    switch(type) {
        case "text":
            return <TextInput {...rest} />
        case "password":
            return <PasswordInput {...rest} />
        case "number":
            return <NumberInput {...rest} />
        case "search":
            return <SearchInput {...rest} />
        default:
            return null;
    }
}