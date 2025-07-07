"use client";

import clsx from "clsx";
import React from "react";

import ButtonProps from "./Button.types"
import styles from "./Button.module.scss";

export default function Button(props: ButtonProps) {

	const {children, appearance = "standard", type = "button", disabled = false, style, className, onClick} = props;
	const button_type = () => {
		const has_text = React.Children.toArray(children).some(child => typeof child === "string");
		const has_icon = React.Children.toArray(children).some(child => React.isValidElement(child));
		return has_text ? (has_icon ? "text_with_icon" : "text_only") : "icon_only";
	};

	const root = clsx(
		styles[`button_${appearance}`],
		styles[`button_${button_type()}`],
		className
	);

	return (
		<button style={style} className={root} disabled={disabled} onClick={onClick} type={type}>
			{children}
		</button>
	);

};