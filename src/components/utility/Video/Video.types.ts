export default interface VideoProps {

    style?: React.CSSProperties;

    className?: string;
    
    src: string;

    controls?: boolean;

    autoPlay?: boolean;

    loop?: boolean;

    muted?: boolean;

    poster?: string;

}