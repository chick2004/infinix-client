
import clsx from "clsx";
import Image from "next/image";
import { Layer, Text } from "@/components";
import ProfileMediaGalleryCardProps from "./ProfileMediaGalleryCard.types";
import styles from "./ProfileMediaGalleryCard.module.scss";

export default function ProfileMediaGalleryCard({ style, className, ref }: ProfileMediaGalleryCardProps) {

    const root = clsx(
        styles.root,
        className
    );

    return (
        <Layer stroke className={root} style={style} ref={ref}>
            <div className={styles.header}>
                <Text type="body_strong">Media Gallery</Text>
                <button><Text appearance="accent_text" color="primary">See all</Text></button>
            </div>
            <div className={styles.media_list}>
                <div className={styles.media}>
                    <Image src={"/images/splash3.webp"} alt={"cover-photo"} fill></Image>
                </div>
                <div className={styles.media}>
                    <Image src={"/images/splash3.webp"} alt={"cover-photo"} fill></Image>
                </div>
                <div className={styles.media}>
                    <Image src={"/images/splash3.webp"} alt={"cover-photo"} fill></Image>
                </div>
                <div className={styles.media}>
                    <Image src={"/images/splash3.webp"} alt={"cover-photo"} fill></Image>
                </div>
                <div className={styles.media}>
                    <Image src={"/images/splash3.webp"} alt={"cover-photo"} fill></Image>
                </div>
            </div>
        </Layer>
    )
}