import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navigation.module.css';

const Navigation = ({userObj}) => {
    
    return <nav>
        <ul className={styles.navUl}>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/calendar">My Day</Link>
            </li>
            <li>
                <Link to="/profile">{userObj.displayName}의 Profile</Link>
            </li>
        </ul>
    </nav>
}

export default Navigation;