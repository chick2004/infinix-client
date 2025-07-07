import clsx from "clsx";
import Image from "next/image";
import { useAuth } from "@/hooks";
import { Video, Card, Text } from "@/components";
import CommentCardProps from "./CommentCard.types";
import styles from "./CommentCard.module.scss";

export default function CommentCard({ style, className, ref, comment, onStartEdit}: CommentCardProps) {

    const { user } = useAuth();

    const root = clsx(
        styles.comment,
        className
    );

    return (
        <div className={root} style={style} ref={ref}>
            <Image className={styles.avatar} src={comment.user?.profile?.profile_photo || "/images/avatar.png"} width={30} height={30} alt="Avatar" />
            <div className={styles.comment_content_container}>
                <div className={styles.comment_name_and_content}>
                    <Text type="body_strong" className={styles.display_name}>{comment.user?.profile?.display_name}</Text>
                    <Card className={styles.comment_text}>
                        <Text>{comment.content}</Text>
                    </Card>
                </div>
                {comment.media && (
                    <div className={styles.comment_media}>
                        {comment.media.type?.startsWith("image/") ? (
                            <Image src={comment.media.path} alt={`media`} width={100} height={100} style={{objectFit: "cover"}}/>
                        ) :  (
                            <Video src={process.env.NEXT_PUBLIC_API_URL + "/media" + comment.media.path.replace(process.env.NEXT_PUBLIC_API_URL + "", "")} controls autoPlay muted loop style={{objectFit: "cover", width: "100px", height: "100px"}}/>
                        )}
                    </div>
                )}
                <div className={styles.comment_time_and_reply}>
                    <Text type="caption" color="secondary" className={styles.comment_time}>1h ago</Text>
                    <Text type="caption" color="secondary" className={styles.comment_button}>Reply</Text>
                    { user?.id === comment.user.id && (
                        <Text type="caption" color="secondary" className={styles.comment_button} onClick={() => { onStartEdit?.(comment); }}>Edit</Text>
                    )}
                    
                </div>
            </div>
        </div>
    );
}