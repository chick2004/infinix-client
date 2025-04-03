"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from "react";

import { useAuth, useRequest } from "@/hooks";

import { Field, Input, Button, Spinner } from "@/components";
import styles from "./page.module.css";
import { E } from "vitest/dist/chunks/reporters.d.CqBhtcTq.js";

interface StepProps {
    formData: any;
    setFormData: (data: any) => void;
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

    const { data, loading, error, status, execute } = useRequest(process.env.NEXT_PUBLIC_API_URL + "/verify-email", "POST");

    const handleChange = (value: string) => {
        setFormData({...formData, email: value});
    }

    const handleSubmit = () => {
        if (!/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(formData.email)) {
            setFormError({...formError, email: "Email is required and must be a valid email address"});
            return;
        }
        setFormError({});
        execute({email: formData.email});
    }

    useEffect(() => {
        if (status === 200) {
            onNextStep?.();
        }

        if (status === 400) {
            setFormError({...formError, email: "Email is already taken"});
        }

        if (status === 500) {
            setFormError({...formError, email: "An error occurred. Please try again"});
        }
    }, [status]);

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
                {loading ?
                    <Button appearance={"accent"} onClick={handleSubmit} disabled={loading}>
                        <Spinner size={"small"}/>
                        Sending...     
                    </Button>
                    : 
                    <Button appearance={"accent"} onClick={handleSubmit} disabled={loading}>
                        Send code    
                    </Button>}
            </div>
        </div>
    )
}

const VerifyCodeStep = ({formData, setFormData, onNextStep, onPreviousStep}: StepProps) => {

    const [formError, setFormError] = useState<FormError>({});
    const { data, loading, error, status, execute } = useRequest(process.env.NEXT_PUBLIC_API_URL + "/verify-code", "POST");

    const handleChange = (value: string) => {
        setFormData({...formData, code: value});
    }

    const handleSubmit = () => {
        if (!formData.code || formData.code.length < 6) {
            setFormError({...formError, code: "Code is required and must be 6 characters"});
            return;
        }
        setFormError({});
        execute({code: formData.code, email: formData.email});
    }

    useEffect(() => {
        if (status === 200) {
            onNextStep?.();
        }

        if (status === 400) {
            setFormError({...formError, code: "Code is invalid"});
        }

        if (status === 500) {
            setFormError({...formError, code: "An error occurred. Please try again"});
        }
    }, [status]);

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
                {loading ?
                    <Button appearance={"accent"} onClick={handleSubmit} disabled={loading}>
                        <Spinner size={"small"}/>
                        Verifying...     
                    </Button>
                    : 
                    <Button appearance={"accent"} onClick={handleSubmit} disabled={loading}>
                        Verify    
                    </Button>}
            </div>
        </div>
    )
}

const SetPasswordStep = ({formData, setFormData}: StepProps) => {

    const { setUser } = useAuth();
    
    const [formError, setFormError] = useState<FormError>({});
    const { data, loading, error, status, execute } = useRequest(process.env.NEXT_PUBLIC_API_URL + "/register", "POST");
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
        execute({email: formData.email, password: formData.password});
    }

    useEffect(() => {
        if (status === 200) {
            console.log(data);
            //router.push("/home");
        }

        if (status === 400 || status === 500) {
            setFormError({ password: "An error occurred. Please try again" });
        }
    }, [status]);

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
                {loading ?
                    <Button appearance={"accent"} onClick={handleSubmit} disabled={loading}>
                        <Spinner size={"small"}/>
                        Creating...     
                    </Button>
                    : 
                    <Button appearance={"accent"} onClick={handleSubmit} disabled={loading}>
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
            <DisplayNameStep formData={formData} setFormData={setFormData} onNextStep={handleNextStep} />,
            <EmailStep formData={formData} setFormData={setFormData} onNextStep={handleNextStep} onPreviousStep={handlePreviousStep}/>,
            <VerifyCodeStep formData={formData} setFormData={setFormData} onNextStep={handleNextStep} onPreviousStep={handlePreviousStep}/>,
            <SetPasswordStep formData={formData} setFormData={setFormData}/>,
        ];
    }, [formData]);

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <form action="" className={styles.form_container}>
                    {steps[step - 1]}
                </form>
            </div>
        </div>
    )
}
