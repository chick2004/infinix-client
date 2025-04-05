"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from "react";

import { Field, Input, Button, Spinner } from "@/components";
import styles from "./page.module.css";
import { useRequest, useAuth } from "@/hooks";

interface FormError {
    display_name?: string;
    email?: string;
    code?: string;
    password?: string;
    confirm?: string;
}

export default function Page() {
    const router = useRouter();
    const [formData, setFormData] = useState({email: "", password: ""});
    const [formError, setFormError] = useState<FormError>({});
    const { data, loading, error, status, execute } = useRequest(process.env.NEXT_PUBLIC_API_URL + "/login", "POST");
    
    const { user, setUser } = useAuth();

    const handleChangeEmail = (value: string) => {
        setFormData({...formData, email: value});
    }

    const handleChangePassword = (value: string) => {
        setFormData({...formData, password: value});
    }

    const handleSubmit = () => {
        execute({email: formData.email, password: formData.password});
    }

    useEffect(() => {
        if (status === 200) {
            setUser(data);
            router.push("/home");
        }

        if (status === 400 || status === 401) {
            setFormError({ email: "Email or password is incorrect", password: "Email or password is incorrect" });
        }

        if (status === 500) {
            console.log("An error occurred. Please try again");
        }
    }, [loading]);

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                
            <form action="" className={styles.form}>
                <div>
                    <Image src="/images/logo_with_text.png" alt="" width={102} height={35}></Image>
                </div>

                <div>
                    <p className={styles.form_title}>Login to your account </p>
                </div>

                <div>
                <Field label="Email" validation_state={formError.email ? "error" : undefined} validation_message={formError?.email || ""}>
                        <Input name="email" onChange={handleChangeEmail}></Input>
                    </Field>
                </div>

                <div>
                <Field label="Password" validation_state={formError.password ? "error" : undefined} validation_message={formError?.password || ""}>
                        <Input name="password" type={"password"} onChange={handleChangePassword}></Input>
                    </Field>
                </div>
                <div>
                    <p className={styles.form_description}>
                        Welcome back! Please login to your account to continue.
                    </p>
                </div>
                <div>
                    <p className={styles.register_link}>Don"t have an account? <span><Link href={"/register"} className="text-accent-default link">Create new</Link></span></p>
                </div>

                <div>
                    {loading ?
                    <Button appearance={"accent"} onClick={handleSubmit} disabled={loading}>
                        <Spinner size={"small"}/>
                        Submitting...     
                    </Button>
                    : 
                    <Button appearance={"accent"} onClick={handleSubmit} disabled={loading}>
                        Login    
                    </Button>}
                </div>
            </form>
        </div>
    </div>
    );
}