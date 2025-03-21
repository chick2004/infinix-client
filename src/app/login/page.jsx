"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from "react";

import { Field, Input, Button } from "@/components";
import styles from "./page.module.css";
import { useFetch, useAuth } from "@/hooks";

export default function Page() {

    const router = useRouter();
    const [formData, setFormData] = useState({email: "", password: ""});
    const [formError, setFormError] = useState({});
    const { data, loading, error, status, execute } = useFetch(process.env.NEXT_PUBLIC_API_URL + "/login",useMemo(() => ({
        method: "POST",
        body: JSON.stringify(formData),
    }), [formData]));
    
    useFetch(process.env.NEXT_PUBLIC_COOKIE_URL, useMemo(() => ({
        method: "GET",
        credentials: "include"
    }), []), true);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        execute();
    }

    useEffect(() => {
        console.log("Data:", data);
        if (status === 200) {
            router.push("/home");
        }

        if (status === 400 || status === 401) {
            setFormError({ email: "Email or password is incorrect", password: "Email or password is incorrect" });
        }

        if (status === 500) {
            console.log("An error occurred. Please try again");
        }
    }, [status]);

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
                <Field label="Email" validation_state={formError.email ? "error" : ""} validation_message={formError?.email || ""}>
                        <Input name="email" onChange={handleChange}></Input>
                    </Field>
                </div>

                <div>
                <Field label="Password" validation_state={formError.password ? "error" : ""} validation_message={formError?.password || ""}>
                        <Input name="password" type={"password"} onChange={handleChange}></Input>
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
                    <Button appearance={"accent"} onClick={handleSubmit} disabled={loading}>
                        {loading ? "Submitting..." : "Login"}
                    </Button>
                </div>
            </form>
        </div>
    </div>
    );
}