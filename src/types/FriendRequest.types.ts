export default interface FriendRequest {

    id: number;

    sender: {
        id: number;
        profile: {
            display_name: string;
            profile_photo: string;
        };
    };

    receiver: {
        id: number;
        profile: {
            display_name: string;
            profile_photo: string;
        };
    };

    created_at: string;
    updated_at: string;
}