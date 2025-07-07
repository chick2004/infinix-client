"use client";

import clsx from "clsx";
import Image from "next/image";
import { requestInit } from "@/lib";
import { useMutation } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { Surface, Text, Button, Icon, Field, Input } from "@/components";
import CreateConversationCardProps from "./CreateConversationCard.types";
import styles from "./CreateConversationCard.module.scss";

export default function CreateConversationCard({ style, className, ref, onClose }: CreateConversationCardProps) {
    
    const root = clsx(
        styles.root,
        className
    );

    const [formData, setFormData] = useState({
        name: "",
        image: {} as {file: File | null, url: string},
        is_group: true,
    });

    const mutateCreateConversation = async (value: { name: string; image: File | null; is_group: boolean }) => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/conversations", requestInit("POST", value));
        if (!response.ok) {
            throw new Error("Failed to create conversation");
        }
        const data = await response.json();
        return data;
    }

    const createConversationMutation = useMutation({
        mutationFn: mutateCreateConversation,
        onSuccess: () => {
            onClose?.();
        },
        onError: (error) => {
            console.error("Error creating conversation:", error);
        },
    });

    const handleSubmit = () => {
        if (formData.name.trim() === "") return
        createConversationMutation.mutate({
            ...formData,
            image: formData.image.file ?? null,
        });
    }

    const handleInputChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            name: value,
        }));
    }

    const inputFileRef = useRef<HTMLInputElement>(null);
    
    return (
        <Surface stroke shadow className={root} style={style} ref={ref}>
            <div className={styles.create_conversation_header}>
                <Text type="body_strong">Create Conversation</Text>
                <Button appearance={"subtle"} onClick={onClose}>
                    <Icon name={"dismiss"} size={16}></Icon>
                </Button>
            </div>
            <div className={styles.create_conversation_image}>
                <div className={styles.image_container}>
                    <Image src={formData.image.url ?? "/images/avatar.png"} alt={"create conversation"} width={100} height={100}></Image>
                    <button onClick={() => {inputFileRef.current?.click()}}>
                        <Icon name={"add"} size={16}></Icon>
                    </button>
                </div>
            </div>
            <Field label="Conversation name">
                <Input onChange={handleInputChange}></Input>
            </Field>
            <div className={styles.buttons}>
                <Button onClick={onClose}>Cancel</Button>
                <Button appearance="accent" onClick={handleSubmit}>Create</Button>
            </div>
            <input type="file" ref={inputFileRef} style={{ display: "none" }} accept="image/*,video/*" multiple onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                    setFormData((prev) => ({
                        ...prev,
                        image: {file: file, url: URL.createObjectURL(file)},
                    }));
                }
            }}/>
        </Surface>
    );
}