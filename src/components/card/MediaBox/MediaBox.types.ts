import { Media } from "@/types";
export default interface MediaBoxProps {

    medias: Media[],

    onClick?: () => void,

    style?: React.CSSProperties;

}