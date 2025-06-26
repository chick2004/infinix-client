
import clsx from "clsx";
import { Layer, Text, Input, Select, Field } from "@/components";
import BookmarkFilterCardProps from "./BookmarkFilterCard.types";
import styles from "./BookmarkFilterCard.module.scss";

export default function BookmarkFilterCard({ style, className, ref }: BookmarkFilterCardProps) {

    const root = clsx(
        styles.root,
        className
    );

    return(
        <Layer stroke className={root} style={style} ref={ref}>
            <Text type="body_strong">Bookmarks</Text>
            <div className={styles.grid}>
                <Field label="Search" className={styles.filter_search}>
                    <Input type="search"></Input>
                </Field>
                <Field label="Type" className={styles.filter_type}>
                    <Select options={["post", "message"]}></Select>
                </Field>
                <Field label="Sort by" className={styles.filter_sort}>
                    <Select options={["asc", "des"]}></Select>
                </Field>
                <Field label="From" className={styles.filter_from}>
                    <Input type="date"></Input>
                </Field>
                <Field label="To" className={styles.filter_to}>
                    <Input type="date"></Input>
                </Field>
            </div>
            
        </Layer>
    );
}