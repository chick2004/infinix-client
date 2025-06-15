import Media from './Media.types';
import User from './User.types';
export default interface Comment {

    id?: number;

    post_id?: string;

    content?: string;

    user?: User;

    media?: Media
}