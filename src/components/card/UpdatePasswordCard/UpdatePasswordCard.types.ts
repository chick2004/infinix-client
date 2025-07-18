import { HTMLAttributes } from "react";
export interface UpdatePasswordCardProps extends HTMLAttributes<HTMLDivElement> {

    onClose?: () => void;

    onUpdated?: () => void;

}