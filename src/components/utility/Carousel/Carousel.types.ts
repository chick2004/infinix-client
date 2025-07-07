import type { PostMedia } from "@/types";
export default interface CarouselProps {

    medias: PostMedia[];

    className?: string;

    style?: React.CSSProperties;
    
    ref?: React.Ref<HTMLDivElement>;

    autoPlay?: boolean;

    interval?: number;

    showIndicators?: boolean;

    showArrows?: boolean;
}