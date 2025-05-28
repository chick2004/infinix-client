import { Media } from "@/types";
export default interface CarouselProps {

    medias: Media[];

    className?: string;

    autoPlay?: boolean;

    interval?: number;

    showIndicators?: boolean;

    showArrows?: boolean;
}