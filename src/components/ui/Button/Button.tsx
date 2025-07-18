"use client";

import clsx from "clsx";
import React from "react";
import ButtonProps from "./Button.types"
import styles from "./Button.module.scss";

export default function Button({className, appearance = "standard", ...props}: ButtonProps) {

	const button_type = () => {
		const has_text = React.Children.toArray(props.children).some(child => typeof child === "string");
		const has_icon = React.Children.toArray(props.children).some(child => React.isValidElement(child));
		return has_text ? (has_icon ? "text_with_icon" : "text_only") : "icon_only";
	};

	const root = clsx(
		styles[`button_${appearance}`],
		styles[`button_${button_type()}`],
		className
	);

	return (
		<button className={root} {...props}>
			{props.children}
		</button>
	);

};