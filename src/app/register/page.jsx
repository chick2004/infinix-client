"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from "react";

import { Field, Input, Button } from "@/components";
import styles from "./page.module.css";
import { useFetch } from "@/hooks";

const DisplayNameStep = ({formData, setFormData, onNextStep}) => {

    const [formError, setFormError] = useState({});

    const handleChange = (e) => {
        setFormData({...formData, display_name: e.target.value});
    }

    const handleSubmit = () => {
        if (!formData.display_name || formData.display_name.length < 5) {
            setFormError({...formError, display_name: "Full name is required and must be at least 5 characters"});
            return;
        }
        setFormError({});
        onNextStep();
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
                <Field label="Full name" validation_state={formError.display_name ? "error" : ""} validation_message={formError?.display_name || ""}>
                    <Input name="display_name" defaultValue={formData.display_name} onChange={handleChange} />
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

const EmailStep = ({formData, setFormData, onNextStep, onPreviousStep}) => {

    const [formError, setFormError] = useState({});
    const { data, loading, error, status, execute } = useFetch(process.env.NEXT_PUBLIC_API_URL + "/verify-email",useMemo(() => ({
        method: "POST",
        body: JSON.stringify({ email: formData.email }),
    }), [formData.email]));

    const handleChange = (e) => {
        setFormData({...formData, email: e.target.value});
    }

    const handleSubmit = () => {
        if (!/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(formData.email)) {
            setFormError({...formError, email: "Email is required and must be a valid email address"});
            return;
        }
        setFormError({});
        execute();
    }

    useEffect(() => {
        if (status === 200) {
            onNextStep();
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
                <Field label="Email" validation_state={formError.email ? "error" : ""} validation_message={formError?.email || ""}>
                    <Input name="email" defaultValue={formData.email} onChange={handleChange} />
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
                <Button appearance="accent" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Sending..." : "Send code"}
                </Button>
            </div>
        </div>
    )
}

const VerifyCodeStep = ({formData, setFormData, onNextStep, onPreviousStep}) => {

    const [formError, setFormError] = useState({});
    const { data, loading, error, status, execute } = useFetch(process.env.NEXT_PUBLIC_API_URL + "/verify-code",useMemo(() => ({
        method: "POST",
        body: JSON.stringify({ email: formData.email, code: formData.code }),
    }), [formData.email, formData.code]));

    const handleChange = (e) => {
        setFormData({...formData, code: e.target.value});
    }

    const handleSubmit = () => {
        if (!formData.code || formData.code.length < 6) {
            setFormError({...formError, code: "Code is required and must be 6 characters"});
            return;
        }
        setFormError({});
        execute();
    }

    useEffect(() => {
        if (status === 200) {
            onNextStep();
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
                <Field label="Verification code" validation_state={formError.code ? "error" : ""} validation_message={formError?.code || ""}>
                    <Input name="code" defaultValue={formData.code} onChange={handleChange} />
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
                <Button appearance="accent" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Verifying..." : "Verify"}
                </Button>
            </div>
        </div>
    )
}

const SetPasswordStep = ({formData, setFormData}) => {
    
    const [formError, setFormError] = useState({});
    const { data, loading, error, status, execute } = useFetch(process.env.NEXT_PUBLIC_API_URL + "/register",useMemo(() => ({
        method: "POST",
        body: JSON.stringify(formData),
    }), [formData]));
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
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
        execute();
    }

    useEffect(() => {
        if (status === 200) {
            router.push("/home");
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
                <Field label="Password" validation_state={formError.password ? "error" : ""} validation_message={formError?.password || ""}>
                    <Input name="password" type="password" defaultValue={formData.password} onChange={handleChange} />
                </Field>
            </div>
            <div>
                <Field label="Password" validation_state={formError.confirm ? "error" : ""} validation_message={formError?.confirm || ""}>
                    <Input name="confirm" type="password" defaultValue={formData.confirm} onChange={handleChange} />
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
                <Button appearance="accent" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Creating..." : "Create"}
                </Button>
            </div>
        </div>
    )
}

export default function Page() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ display_name: "", email: "", password: "", code: "", confirm: "" });

    useFetch(process.env.NEXT_PUBLIC_COOKIE_URL, useMemo(() => ({
        method: "GET",
        credentials: "include"
    }), []), true);
    
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
