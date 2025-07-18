import { useContext, createContext } from "react";

type RadioGroupContextType = {
    values: Record<string, string>;
    setValue: (name: string, value: string) => void;
};

export const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

export function useRadioGroup(name: string) {
    const context = useContext(RadioGroupContext);
    if (!context) throw new Error("useRadioGroup must be used within RadioGroupProvider");

    const { values, setValue } = context;
    return {
        selectedValue: values[name],
        setSelectedValue: (value: string) => setValue(name, value),
    };
}