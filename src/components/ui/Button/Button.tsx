"use client";

import React, { useMemo } from "react";

import ButtonProps from "./Button.types"
import styles from "./Button.module.scss";

export default function Button(props: ButtonProps) {

	const {children, appearance = "standard", type = "button", disabled = false, style, className, onClick} = props;

	const classes = useMemo(() => {
		const buttonType = () => {
			const has_text = React.Children.toArray(children).some(child => typeof child === "string");
			const has_icon = React.Children.toArray(children).some(child => React.isValidElement(child));
			return has_text ? (has_icon ? "text_with_icon" : "text_only") : "icon_only";
		};
		return `${styles[`button_${appearance}`]} ${styles[`button_${buttonType()}`]} ${className}`;
	}, [children, appearance]);

	return (
		<button style={style} className={classes} disabled={disabled} onClick={onClick} type={type}>
			{children}
		</button>
	);

};