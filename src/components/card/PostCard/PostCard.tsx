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

    const postEditRef = useRef<HTMLDivElement>(null);
    useClickOutside(postEditRef, () => {
        setIsOpenEdit(false);
    });

    const { shouldRender: shouldRenderDetailCard, animationStyle: animationStyleDetailCard} = useMotion(isOpenDetail, { appear: MotionName.SCALE_UP_IN, disappear: MotionName.SCALE_DOWN_OUT });
    const { shouldRender: shouldRenderEditCard, animationStyle: animationStyleEditCard } = useMotion(isOpenEdit, { appear: MotionName.SCALE_UP_IN, disappear: MotionName.SCALE_DOWN_OUT });

    return (
        <>
            <DefaultPostCard {...props} handleOpenEditPost={() => setIsOpenEdit(true)} handleOpenDetailPost={() => {setIsOpenDetail(true)}}></DefaultPostCard>

            {shouldRenderDetailCard && (
                <DetailPost {...props} className={styles.post_detail_container} style={animationStyleDetailCard} ref={postDetailRef} handleClose={() => {setIsOpenDetail(false)}}></DetailPost>
            )}

            {shouldRenderEditCard && (
                <EditPostCard {...props} className={styles.post_edit_container} style={animationStyleEditCard} ref={postEditRef} handleClose={() => setIsOpenEdit(false)}></EditPostCard>
            )}
        </>
    );
});
