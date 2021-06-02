import React from 'react';
import { dbService } from '../../firebase'

const Day = ({dayObj, isOwner}) => {

    const onDeleteClick = async() => {
        const ok = window.confirm("Are you want to delete this day?");
        // console.log(ok)

        if (ok) {
            // delete
            await dbService.doc(`dayday/${dayObj.id}`).delete();
        }


        

    }

    return (
        <div>
            <h4>{dayObj.text}</h4>
            {isOwner && (
                <>
                    <button onClick={onDeleteClick}>Delete</button>
                    <button>Edit</button>
                </>
            )}
        </div>
    );
};

export default Day;
