import { ComponentPropsWithRef } from "react";
export default interface ButtonProps extends ComponentPropsWithRef<"button"> {

    appearance?: "accent" | "standard" | "subtle" | "transparent";

}