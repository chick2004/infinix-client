"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from "react";

import { Field, Input, Button, Spinner } from "@/components";
import styles from "./page.module.css";
import { useAuth } from "@/hooks";
import { requestInit } from "@/lib";
import { useMutation } from "@tanstack/react-query";

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
    
    const mutateLogin = async (data: {email: string, password: string}) => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/login", requestInit("POST", data));
        if (!response.ok) {
            throw new Error("Failed to login");
        }
        return response.json();
    }

    const { refetchUser  } = useAuth();

    const loginMutation = useMutation({
        mutationFn: mutateLogin,
        onError: (error) => {
            console.error("Error logging in:", error);
        },
        onSuccess: (data) => {
            if (data.status === 200) {
                refetchUser();
                router.push("/home"); // push ngay sau khi setUser
            }
            if (data.status === 400 || data.status === 401) {
                setFormError({ email: "Email or password is incorrect", password: "Email or password is incorrect" });
            }
        }
    });


    const handleChangeEmail = (value: string) => {
        setFormData({...formData, email: value});
    }

    const handleChangePassword = (value: string) => {
        setFormData({...formData, password: value});
    }

    const handleSubmit = () => {
        loginMutation.mutate(formData);
    }

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
                    {loginMutation.isPending ?
                    <Button appearance={"accent"} disabled>
                        <Spinner size={"small"}/>
                        Submitting...     
                    </Button>
                    : 
                    <Button appearance={"accent"} onClick={handleSubmit}>
                        Login    
                    </Button>}
                </div>
            </form>
        </div>
    </div>
    );
}