import Image from "next/image";
import { Video } from "@/components"

import  MediaBoxProps from "./MediaBox.types";
import styles from "./MediaBox.module.scss";

export default function MediaBox({ medias, onClick, style }: MediaBoxProps) {

    if (!Array.isArray(medias)) return null;

    const extraMediaCount = medias.length > 5 ? medias.length - 5 : 0;

    const mediaGalleryClassName = () => {
        const subClassName = () => {
            switch (medias.length) {
                case 1: return styles.one_image;
                case 2: return styles.two_images;
                case 3: return styles.three_images;
                case 4: return styles.four_images;
                case 5: return styles.five_images;
                default: return styles.more_images;
            }
        }
        return `${styles.media_gallery} ${subClassName()}`;
    };
    
    return (
        <div className={styles.media_box} style={style}>
            <div className={mediaGalleryClassName()} onClick={onClick}> 
                {medias.slice(0, 5).map((media, index) => (
                    <div key={index} className={styles.media_item}>
                        {media.type.startsWith("video/") ? (
                            <Video src={process.env.NEXT_PUBLIC_API_URL + "/media" + media.path.replace(process.env.NEXT_PUBLIC_SERVER_URL+"", "")} controls={false} autoPlay={true} muted={true} loop style={{objectFit: "fill", height: "100%", width: "100%", display: "block"}}/>
                        ) : (
                            <Image src={media.path} alt={`media-${index}`}fill/>
                        )}
                        {index === 4 && extraMediaCount > 0 && (
                            <div className={styles.overlay}>+{extraMediaCount}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}