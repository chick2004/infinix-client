import EmojiType from "./Emoji.types";
export default interface EmojiPickerProps {

    ref?: React.Ref<HTMLDivElement>;

    onEmojiSelect: (emoji: EmojiType) => void;

}