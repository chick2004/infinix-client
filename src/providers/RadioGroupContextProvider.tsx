import React, { useState } from "react";
import { RadioGroupContext } from "@/hooks";

export function RadioGroupProvider({ children }: { children: React.ReactNode }) {
    const [values, setValues] = useState<Record<string, string>>({});

    const setValue = (name: string, value: string) => {
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <RadioGroupContext.Provider value={{ values, setValue }}>
            {children}
        </RadioGroupContext.Provider>
    );
}
