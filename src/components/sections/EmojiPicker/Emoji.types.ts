export default interface EmojiType {

    slug: string;

    character: string;

    unicodeName: string;

    codePoint: string;

    group: string;

    subGroup: string;

    variants?: EmojiType[];
}