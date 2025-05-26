"use client";
import { useState, useRef, memo } from "react";

import DetailPost from "./DetailPostCard/DetailPostCard";
import EditPostCard from "./EditPostCard/EditPostCard";
import DefaultPostCard from "./DefaultPostCard/DefaultPostCard";
import { useClickOutside, useMotion, MotionName } from "@/hooks";

import PostCardProps from "./PostCard.types";
import styles from "./PostCard.module.scss";

export default memo(function PostCard(props: PostCardProps) {

    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);

    const postDetailRef = useRef<HTMLDivElement>(null);
    useClickOutside(postDetailRef, () => {
        setIsOpenDetail(false);
    });

    const { shouldRender, animationStyle} = useMotion(isOpenDetail, { appear: MotionName.SCALE_UP_IN, disappear: MotionName.SCALE_DOWN_OUT });

    return (
        <>
            <DefaultPostCard {...props} handleOpenEditPost={() => setIsOpenEdit(true)} handleOpenDetailPost={() => {setIsOpenDetail(true)}}></DefaultPostCard>

            {shouldRender && (
                <div className={styles.post_detail_container}>
                    <DetailPost {...props} style={animationStyle} ref={postDetailRef} handleClose={() => {setIsOpenDetail(false)}}></DetailPost>
                </div>
                
            )}

            {isOpenEdit && (
                <EditPostCard {...props} className={styles.post_edit_container} handleClose={() => setIsOpenEdit(false)}></EditPostCard>
            )}
        </>
    );
});
