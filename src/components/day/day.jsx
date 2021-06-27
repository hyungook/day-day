import React, { useState } from 'react';
import { dbService, storageService } from '../../firebase'
import styles from './day.module.css';

const Day = ({dayObj, isOwner}) => {

    const [editing, setEditing] = useState(false);
    const [newDay, setNewDay] = useState(dayObj.text);

    const onDeleteClick = async() => {
        const ok = window.confirm("Are you want to delete this day?");
        // console.log(ok)

        if (ok) {
            // delete
            await dbService.doc(`dayday/${dayObj.id}`).delete();
            await storageService.refFromURL(dayObj.attachmentUrl).delete();
        }
    }

    const onEditClick = () => {
        setEditing((prev) => !prev)
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(dayObj, newDay);
        await dbService.doc(`dayday/${dayObj.id}`).update({
            text:newDay,
        })
        setEditing(false);
    }
    const onChange = (event) => {
        const {target:{value},} = event;
        setNewDay(value);
    };

    return (
        <div className={styles.div}>
            {
                editing ? (
                    <>
                        <form onSubmit={onSubmit} className={styles.form}>
                            <input type="text" placeholder="Edit" value={newDay} required onChange={onChange} />
                            <input type="submit" value="Update" />
                        </form>
                        <button onClick={onEditClick}>cancel</button>
                    </>
                ) : (
                    <>
                        {dayObj.attachmentUrl && <div className={styles.imgBox}><img src={dayObj.attachmentUrl} className={styles.img} /></div>}
                        <h4 className={styles.h4}>{dayObj.text}</h4>
                        {dayObj.date}
                        {isOwner && (
                            <>
                                <button onClick={onDeleteClick}>Delete</button>
                                <button onClick={onEditClick}>Edit</button>
                            </>
                        )}
                </>)
            }
        </div>
    );
};

export default Day;