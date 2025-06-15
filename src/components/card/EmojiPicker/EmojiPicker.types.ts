import EmojiType from "./Emoji.types";
export default interface EmojiPickerProps {

    style?: React.CSSProperties;

    className?: string;

    ref?: React.Ref<HTMLDivElement>;

    onEmojiSelect: (emoji: EmojiType) => void;

}