export default interface SliderProps {

    className?: string;

    style?: React.CSSProperties;

    direction?: "horizontal" | "vertical";

    min?: number;

    max?: number;

    step?: number;

    value?: number;

    disabled?: boolean;
    
    onChange?: (value: number) => void;
}