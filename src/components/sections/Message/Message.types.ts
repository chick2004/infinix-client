export default interface MessageProps {

    id: number;

    user_id: number;

    user_displayname: string;

    content: string;

    time: Date;

    avatar: string;

    is_own: boolean;

    onReply?: () => void;

    onCopy?: () => void;

    onEdit?: () => void;

    onPin?: () => void;
}