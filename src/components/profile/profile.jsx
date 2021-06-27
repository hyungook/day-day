import React, { useEffect, useState } from 'react';
import { authService, dbService } from '../../firebase'
import { useHistory } from 'react-router-dom';
import styles from './profile.module.css';

const Profile = ({refreshUser, userObj}) => {

    const history = useHistory;
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut();
        history.push('/');
        console.log('logOut')
    };

    const getMyDay = async() => {
        const days = await dbService
            .collection("dayday")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createdAt")
            .get();
            
            console.log(days.docs.map((doc) => doc.data()))
    };

    useEffect(() => {
        getMyDay();
    },[])

    const onSubmit = async (event) => {
        event.preventDefault();

        if(userObj.displayName !== newDisplayName) {
            // console.log(userObj.updateProfile)
            await userObj.updateProfile({
                displayName: newDisplayName
            })
        }
        refreshUser();
    }

    const onChange = (event) => {
        const {
        target: {value},
        } = event;
        setNewDisplayName(value);
    }

    return <>
    <form onSubmit={onSubmit} className={styles.form}>
        <input type="text" placeholder="Display name" value={newDisplayName} onChange={onChange} />
        <input type="submit" value="Update Profile" />
    </form>
        <button onClick={onLogOutClick}>Log Out</button>
    </>
}

export default Profile;