import type { User } from "@/types"
export default interface ProfileCardProps {

    style?: React.CSSProperties;

    className?: string;

    ref?: React.Ref<HTMLDivElement>;

    user: User;

    is_owner: boolean;
    
}