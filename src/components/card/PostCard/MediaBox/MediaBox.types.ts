import { PostMedia } from "@/types";
export default interface MediaBoxProps {

    medias: PostMedia[],

    onClick?: () => void,

    style?: React.CSSProperties;

}