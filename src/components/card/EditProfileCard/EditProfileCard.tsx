"use client";

import EditPostCardProps from "./EditProfileCard.types";
import styles from "./EditProfileCard.module.scss";

export default function EditProfileCard(props: EditPostCardProps) {

    return (
        <div className={styles.editProfileCard} {...props}>
            <h2>Edit Profile</h2>
            <form>
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>
                <label>
                    Bio:
                    <textarea name="bio" />
                </label>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}