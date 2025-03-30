import EmojiType from "./Emoji.types";
export default interface EmojiPickerProps {

    onEmojiSelect: (emoji: EmojiType) => void;

}