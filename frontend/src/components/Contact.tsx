import React from "react";
import profile from '../assets/images/blank-profile.png'
import styles from './Contacts.module.css';
interface ContactProps {
    name: string;
}
const Contact: React.FC<ContactProps> = (props) => {
    return (
        <div className={styles.mainContainer}>
            <img className={styles.profileImage} src={profile} alt="profile" />
            <p>{props.name}</p>
        </div>
    );
};

export default Contact;
