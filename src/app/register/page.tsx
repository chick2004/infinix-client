"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState, useMemo } from "react";

import { useAuth } from "@/hooks";

import { requestInit } from "@/lib";
import { useMutation } from "@tanstack/react-query";

import { Field, Input, Button, Spinner } from "@/components";
import styles from "./page.module.css";

interface StepProps {
    formData: {display_name: string, email: string, password: string, code: string, confirm: string};
    setFormData: (data: {display_name: string, email: string, password: string, code: string, confirm: string}) => void;
    onNextStep?: () => void;
    onPreviousStep?: () => void;
}

interface FormError {
    display_name?: string;
    email?: string;
    code?: string;
    password?: string;
    confirm?: string;
}

const DisplayNameStep = ({formData, setFormData, onNextStep}: StepProps) => {

    const [formError, setFormError] = useState<FormError>({});

    const handleChange = (value: string) => {
        setFormData({...formData, display_name: value});
    }

    const handleSubmit = () => {
        if (!formData.display_name || formData.display_name.length < 5) {
            setFormError({...formError, display_name: "Full name is required and must be at least 5 characters"});
            return;
        }
        setFormError({});
        onNextStep?.();
    }

    return (
        <div className={styles.form}>
            <div>
                <Image src="/images/logo_with_text.png" alt="" width={102} height={35} />
            </div>
            <div>
                <p className={styles.form_title}>Create an account</p>
            </div>
            <div>
                <Field label="Full name" validation_state={formError.display_name ? "error" : undefined} validation_message={formError?.display_name || undefined}>
                    <Input name="display_name" value={formData.display_name} onChange={handleChange} />
                </Field>
            </div>
            <div>
                <p className={styles.form_description}>
                    Your full name will be displayed on your profile, can change it later.
                </p>
            </div>
            <div>
                <p className={styles.login_link}>
                    Already have an account? <span><Link href={"/login"}>Login</Link></span>
                </p>
            </div>
            <div>
                <Button appearance="accent" onClick={handleSubmit}>Next</Button>
            </div>
        </div>
    );
}

const EmailStep = ({formData, setFormData, onNextStep, onPreviousStep}: StepProps) => {

    const [formError, setFormError] = useState<FormError>({});

    const mutateEmail = async (data: {email: string}) => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/verify-email", requestInit("POST", data));
        if (!response.ok) {
            throw new Error("Failed to send verification code");
        }
        return response.json();
    }

    const emailMutation = useMutation({
        mutationFn: mutateEmail,
        onError: (error) => {
            console.error("Error sending verification code:", error);
        },
        onSuccess: (data) => {
            if (data.status === 200) {
                onNextStep?.();
            }
            if (data.errors?.email?.some((e: string) => e.includes("ERR_EMAIL_ALREADY_EXISTS"))) {
                setFormError({ email: "Email already exists" });
            }
        }
    });
        


    const handleChange = (value: string) => {
        setFormData({...formData, email: value});
    }

    const handleSubmit = () => {
        if (!/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(formData.email)) {
            setFormError({...formError, email: "Email is required and must be a valid email address"});
            return;
        }
        setFormError({});
        emailMutation.mutate({email: formData.email});
    }

    return (
        <div className={styles.form}>
            <div>
                <Image src="/images/logo_with_text.png" alt="" width={102} height={35} />
            </div>
            <div>
                <p className={styles.form_title}>Create an account</p>
            </div>
            <div>
                <Field label="Email" validation_state={formError.email ? "error" : undefined} validation_message={formError?.email || ""}>
                    <Input name="email" value={formData.email} onChange={handleChange} />
                </Field>
            </div>
            <div>
                <p className={styles.form_description}>
                    We will send a verification code to your email address.
                </p>
            </div>
            <div>
                <p className={styles.login_link}>
                    Already have an account? <span><Link href={"/login"} className="text-accent-default link">Login</Link></span>
                </p>
            </div>
            <div>
                <Button appearance="standard" onClick={onPreviousStep}>Back</Button>
                {emailMutation.isPending ?
                    <Button appearance={"accent"} disabled>
                        <Spinner size={"small"}/>
                        Sending...     
                    </Button>
                    : 
                    <Button appearance={"accent"} onClick={handleSubmit}>
                        Send code    
                    </Button>}
            </div>
        </div>
    )
}

const VerifyCodeStep = ({formData, setFormData, onNextStep, onPreviousStep}: StepProps) => {

    const [formError, setFormError] = useState<FormError>({});

    const mutateCode = async (data: {code: string, email: string}) => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/verify-code", requestInit("POST", data));
        if (!response.ok) {
            throw new Error("Failed to verify code");
        }
        return response.json();
    }

    const codeMutation = useMutation({
        mutationFn: mutateCode,
        onError: (error) => {
            console.error("Error verifying code:", error);
        },
        onSuccess: (data) => {
            if (data.status === 200) {
                onNextStep?.();
            }
            if (data.errors?.code?.some((e: string) => e.includes("ERR_INVALID_CODE"))) {
                setFormError({ code: "Invalid code" });
            }
        }
    });

    const handleChange = (value: string) => {
        setFormData({...formData, code: value});
    }

    const handleSubmit = () => {
        if (!formData.code || formData.code.length < 6) {
            setFormError({...formError, code: "Code is required and must be 6 characters"});
            return;
        }
        setFormError({});
        codeMutation.mutate({code: formData.code, email: formData.email});
    }

    return (
        <div className={styles.form}>
            <div>
                <Image src="/images/logo_with_text.png" alt="" width={102} height={35} />
            </div>
            <div>
                <p className={styles.form_title}>Create an account</p>
            </div>
            <div>
                <Field label="Verification code" validation_state={formError.code ? "error" : undefined} validation_message={formError?.code || ""}>
                    <Input name="code" value={formData.code} onChange={handleChange} />
                </Field>
            </div>
            <div>
                <p className={styles.form_description}>
                    Enter the verification code sent to your email address.
                </p>
            </div>
            <div>
                <p className={styles.login_link}>
                    Already have an account? <span><Link href={"/login"} className="text-accent-default link">Login</Link></span>
                </p>
            </div>
            <div>
                <Button appearance="standard" onClick={onPreviousStep}>Back</Button>
                {codeMutation.isPending ?
                    <Button appearance={"accent"} disabled>
                        <Spinner size={"small"}/>
                        Verifying...     
                    </Button>
                    : 
                    <Button appearance={"accent"} onClick={handleSubmit}>
                        Verify    
                    </Button>}
            </div>
        </div>
    )
}

const SetPasswordStep = ({formData, setFormData}: StepProps) => {

    const { refetchUser } = useAuth();
    
    const [formError, setFormError] = useState<FormError>({});
    
    const mutateRegister = async (data: {email: string, password: string, code: string, display_name: string}) => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/register", requestInit("POST", data));
        if (!response.ok) {
            throw new Error("Failed to register");
        }
        return response.json();
    }

    const registerMutation = useMutation({
        mutationFn: mutateRegister,
        onError: (error) => {
            console.error("Error registering:", error);
        },
        onSuccess: (data) => {
            if (data.status === 200) {
                refetchUser();
                router.push("/home");
            }
        }
    });
    
    const router = useRouter();

    const handleChangePassword = (value: string) => {
        setFormData({...formData, password: value});
    }

    const handleChangeConfirm = (value: string) => {
        setFormData({...formData, confirm: value});
    }

    const handleSubmit = () => {
        if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(formData.password)) {
            setFormError({...formError, password: "Password is required and must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number and one special character"});
            return;
        }
        if (formData.password !== formData.confirm) {
            setFormError({...formError, confirm: "Passwords do not match"});
            return;
        }
        setFormError({});
        registerMutation.mutate({email: formData.email, password: formData.password, code: formData.code, display_name: formData.display_name});
    }

    return (
        <div className={styles.form}>
            <div>
                <Image src="/images/logo_with_text.png" alt="" width={102} height={35} />
            </div>
            <div>
                <p className={styles.form_title}>Create an account</p>
            </div>
            <div>
                <Field label="Password" validation_state={formError.password ? "error" : undefined} validation_message={formError?.password || ""}>
                    <Input name="password" type="password" value={formData.password} onChange={handleChangePassword} />
                </Field>
            </div>
            <div>
                <Field label="Password" validation_state={formError.confirm ? "error" : undefined} validation_message={formError?.confirm || ""}>
                    <Input name="confirm" type="password" value={formData.confirm} onChange={handleChangeConfirm} />
                </Field>
            </div>
            <div>
                <p className={styles.form_description}>
                    Final step, set a password for your account.
                </p>
            </div>
            <div>
                <p className={styles.login_link}>
                    Already have an account? <span><Link href={"/login"}>Login</Link></span>
                </p>
            </div>
            <div>
                {registerMutation.isPending ?
                    <Button appearance={"accent"} disabled>
                        <Spinner size={"small"}/>
                        Creating...     
                    </Button>
                    : 
                    <Button appearance={"accent"} onClick={handleSubmit}>
                        Create    
                    </Button>}
            </div>
        </div>
    )
}

export default function Page() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ display_name: "", email: "", password: "", code: "", confirm: "" });
    
    const handleNextStep = () => {
        setStep(prev => prev + 1);
    }

    const handlePreviousStep = () => {
        setStep(prev => prev - 1);
    }

    const steps = useMemo(() => {
        return [
            <DisplayNameStep formData={formData} setFormData={setFormData} onNextStep={handleNextStep} key="displayName" />,
            <EmailStep formData={formData} setFormData={setFormData} onNextStep={handleNextStep} onPreviousStep={handlePreviousStep} key="email" />,
            <VerifyCodeStep formData={formData} setFormData={setFormData} onNextStep={handleNextStep} onPreviousStep={handlePreviousStep} key="verifyCode" />,
            <SetPasswordStep formData={formData} setFormData={setFormData} key="setPassword" />,
        ];
    }, [formData]);

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.form_container}>
                    {steps[step - 1]}
                </div>
            </div>
        </div>
    )
}
