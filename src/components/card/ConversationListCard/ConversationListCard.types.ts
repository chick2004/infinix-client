import type { Conversation } from "@/types"
export default interface ConversationListCardProps {

    style?: React.CSSProperties;

    className?: string;

    ref?: React.Ref<HTMLDivElement>;

    conversations?: Conversation[];

}