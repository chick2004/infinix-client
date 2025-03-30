"use client";

import { useState, useRef } from "react";
import emoji_list from "./emoji.json";
import { Icon, Input } from "@/components";

import EmojiPickerProps from "./EmojiPicker.types";
import EmojiType from "./Emoji.types";
import styles from "./EmojiPicker.module.css";

export default function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
    const [search, setSearch] = useState<string>("");
    const groupRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const handleSelectGroup = (group: string) => {
        if (groupRefs.current[group]) {
            groupRefs.current[group]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    };

    const handleChangeSearch = (value: string) => {
        setSearch(value.toLowerCase());
    };

    const handleEmojiClick = (emoji: EmojiType) => {
        if (onEmojiSelect) {
            onEmojiSelect(emoji);
        }
    };

    const filteredEmojiList = Object.entries(emoji_list).reduce<Record<string, EmojiType[]>>(
        (acc, [group, emojis]) => {
            const filteredEmojis = (emojis as EmojiType[]).filter((emoji) =>
                emoji.unicodeName.toLowerCase().includes(search)
            );
            if (filteredEmojis.length > 0) {
                acc[group] = filteredEmojis;
            }
            return acc;
        },
        {}
    );

    return (
        <div className={styles.section}>
            <div className={styles.group_list}>
                {Object.keys(emoji_list).map((group) => (
                    <div
                        key={group}
                        className={styles.group}
                        onClick={() => handleSelectGroup(group)}
                    >
                        <Icon name={getIconName(group)} type={"regular"} size={20} />
                    </div>
                ))}
            </div>

            <Input onChange={handleChangeSearch} placeholder="Tìm emoji..." />

            <div className={styles.emoji_container}>
                {Object.entries(filteredEmojiList).map(([group, emojis]) => (
                    <div
                        key={group}
                        ref={(el) => {
                            groupRefs.current[group] = el;
                        }}
                        className={styles.emoji_group}
                    >
                        <p className={styles.group_title}>{group}</p>
                        <div className={styles.emoji_list}>
                            {emojis.map((emoji) => (
                                <span
                                    key={emoji.slug}
                                    className={styles.emoji}
                                    onClick={() => handleEmojiClick(emoji)}
                                >
                                    {emoji.character}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Hàm lấy icon phù hợp với từng nhóm
const getIconName = (group: string): string => {
    const icons: Record<string, string> = {
        recent: "clock",
        emotion: "emoji_laugh",
        people: "person_walking",
        animals: "animal_cat",
        places: "earth",
        activities: "balloon",
        foods: "food_pizza",
        objects: "lightbulb",
        symbols: "heart",
        flags: "flag",
    };
    return icons[group] || "emoji";
};
