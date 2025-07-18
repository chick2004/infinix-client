"use client";
import clsx from "clsx";
import Image from "next/image";
import { useState, useCallback, useMemo } from "react";
import { requestInit } from "@/lib";
import { useMutation } from "@tanstack/react-query";
import { Surface, Field, Input, Button, Text, Spinner } from "@/components";
import { UpdatePasswordCardProps } from "./UpdatePasswordCard.types";
import styles from "./UpdatePasswordCard.module.scss";

export default function UpdatePasswordCard({className, ...props}: UpdatePasswordCardProps) {

    const root = clsx(styles.root, className);
    const [step, setStep] = useState<"verify" | "setNewPassword">("verify");
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [formErrors, setFormErrors] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const mutateVerifyPassword = async () => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/verify-password", requestInit("POST", {
            current_password: formData.currentPassword
        }));
        if (!response.ok) {
            throw new Error("Verification failed");
        }
        return response.json();
    }
    const verifyPasswordMutation = useMutation({
        mutationFn: mutateVerifyPassword,
        onSuccess: (data) => {
            if (data.status === 200) {
                setStep("setNewPassword");
            } else {
                if (data.errors.current_password.code === "INVALID_PASSWORD") {
                    setFormErrors(prev => ({ ...prev, currentPassword: "Current password is incorrect" }));
                }
            }
        }
    });

    const mutateSetNewPassword = async () => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/change-password", requestInit("POST", {
            current_password: formData.currentPassword,
            new_password: formData.newPassword
        }));
        if (!response.ok) {
            throw new Error("Failed to set new password");
        }
        return response.json();
    }
    const setNewPasswordMutation = useMutation({
        mutationFn: mutateSetNewPassword,
        onSuccess: (data) => {
            if (data.status === 200) {
                props.onClose?.();
            } else {
                if (data.errors.new_password.code === "INVALID_PASSWORD") {
                    setFormErrors(prev => ({ ...prev, newPassword: "New password is invalid" }));
                }
            }
        }
    });

    const handleVerifyPassword = () => {
        if (!formData.currentPassword) {
            setFormErrors(prev => ({ ...prev, currentPassword: "Current password is required" }));
            return;
        }
        verifyPasswordMutation.mutate();
    }

    const handleSetNewPassword = () => {
        if (!formData.newPassword) {
            setFormErrors(prev => ({ ...prev, newPassword: "New password is required" }));
            return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
            setFormErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
            return;
        }
        setNewPasswordMutation.mutate();
    }

    const handleCurrentPasswordChange = useCallback((value: string) => {
        setFormData(prev => ({...prev, currentPassword: value}));
        setFormErrors(prev => ({ ...prev, currentPassword: "" }));
    }, []);

    const handleNewPasswordChange = useCallback((value: string) => {
        setFormData(prev => ({...prev, newPassword: value}));
        setFormErrors(prev => ({ ...prev, newPassword: "" }));
    }, []);

    const handleConfirmPasswordChange = useCallback((value: string) => {
        setFormData(prev => ({...prev, confirmPassword: value}));
        setFormErrors(prev => ({ ...prev, confirmPassword: "" }));
    }, []);

    const VerifyStep = useMemo(() => (
        <>
            <Text type={"body_large"}>Verify your identity</Text>
            <Field label={"Current password"} className={styles.field} validation_message={formErrors.currentPassword} validation_state={formErrors.currentPassword ? "error" : undefined}>
                <Input type="password" placeholder="Enter your current password" value={formData.currentPassword} onChange={handleCurrentPasswordChange}/>
            </Field>
            <div className={styles.buttons}>
                <Button appearance={"standard"} onClick={props.onClose}>Cancel</Button>
                {verifyPasswordMutation.isPending ? (
                    <Button appearance={"accent"}>
                        <Spinner></Spinner>
                        Verifying...
                    </Button>
                ) : (
                    <Button appearance={"accent"} onClick={handleVerifyPassword}>Verify</Button>
                )}
            </div>
        </>
    ), [formData.currentPassword, formErrors.currentPassword, props.onClose, verifyPasswordMutation]);

    const SetNewPasswordStep = useMemo(() => (
        <>
            <Text type={"body_large"}>Set new password</Text>
            <Field label={"New password"} className={styles.field} validation_message={formErrors.newPassword} validation_state={formErrors.newPassword ? "error" : undefined}>
                <Input type="password" placeholder="Enter your new password" value={formData.newPassword} onChange={handleNewPasswordChange} />
            </Field>
            <Field label={"Confirm password"} className={styles.field} validation_message={formErrors.confirmPassword} validation_state={formErrors.confirmPassword ? "error" : undefined}>
                <Input type="password" placeholder="Confirm your new password" value={formData.confirmPassword} onChange={handleConfirmPasswordChange} />
            </Field>
            <div className={styles.buttons}>
                <Button appearance={"standard"} onClick={props.onClose}>Cancel</Button>
                {setNewPasswordMutation.isPending ? (
                    <Button appearance={"accent"}>
                        <Spinner></Spinner>
                        Saving...
                    </Button>
                ) : (
                    <Button appearance={"accent"} onClick={handleSetNewPassword}>Save</Button>
                )}
            </div>
        </>
    ), [formData.newPassword, formData.confirmPassword, formErrors.newPassword, formErrors.confirmPassword, props.onClose]);

    return (
        <Surface stroke shadow className={root} {...props}>
            <Image src="/images/logo_with_text.png" alt="" width={102} height={35} style={{alignSelf: "center"}}></Image>
            {step === "verify" ? VerifyStep : SetNewPasswordStep}
        </Surface> 
    );
        
}