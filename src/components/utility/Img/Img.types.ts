export default interface ImgProps {

    src: string;

    alt?: string;

    width?: number;

    height?: number;

    fill?: boolean;

    style?: React.CSSProperties;

    className?: string;

    onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;

}