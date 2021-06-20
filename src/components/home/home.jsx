import Day from 'components/day/day';
import React, { useEffect, useState } from 'react';
import { dbService, storageService } from '../../firebase'
import {v4 as uuidv4} from 'uuid';
import styles from './home.module.css';



const Home = ({ userObj }) => {

    // login 정보 확인
    // console.log(userObj)

    const [day, setDay] = useState("");
    const  [days, setDays] = useState([]);
    const [attachment, setAttachment] = useState("");

    // forEach 방식
    // const getDays = async() => {
    //     const dbdays = await dbService.collection("dayday").get();
    //     // dbdays.forEach(document =>console.log(document.data()))
    //     dbdays.forEach(document => {

    //         const dayObject = {
    //             // spread attribute 기능이다.
    //             ...document.data(),
    //             id: document.id,
    //         }

    //         // set이 뿥는 함수를 사용할 떄는 값 대신에 함수를 전달할 수 있다
    //         // 그리고 만약 함수를 전달하면, 리액트는 이전 값에 접근할 수 있게 해준다
    //         // implicit return / 배열을 리턴한다. 이 배열에서 첫번째 요소는 가장 최근 document이고, 그 뒤로 이전 document 를 붙인다.
    //         // setDays((prev) => [document.data(), ...prev])
    //         setDays((prev) => [dayObject, ...prev])
    //     })
    // }

    useEffect(() => {
        // getDays();

        dbService.collection("dayday").onSnapshot(snapshot => {
            // console.log(snapshot.docs)
            const dayArray = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data(),
            }));
            // console.log(dayArray)
            setDays(dayArray)
        })

    }, [])

    let today = new Date();   

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    // let theDay = today.getDay();  // 요일

    // console.log(year + '/' + month + '/' + date)

    const onSubmit = async (event) => {
        event.preventDefault()

        let attachmentUrl = ""
        
        if(attachment !== "") {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
            const response =  await attachmentRef.putString(attachment, "data_url")
            // console.log(await response.ref.getDownloadURL())
            attachmentUrl = await response.ref.getDownloadURL()
        }

        const dayObj = {
            text:day,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
            date: year + '.' + month + '.' + date,
        }

        await dbService.collection("dayday").add(dayObj)
        setDay("")
        setAttachment("");

        // await dbService.collection("dayday").add({
        //     text:day,
        //     createdAt: Date.now(),
        //     creatorId: userObj.uid,
        // })
        // setDay("")
        // console.log(day)
    }

    const onChange = (event) => {
        const {target:{value},} = event;
        setDay(value)
    };

    // console.log(days)

    const onFileChange = (event) => {
        const {target:{files},} = event;
        const theFile = files[0];

        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            console.log(finishedEvent)
            const {currentTarget:{result},} = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);

        // console.log(event.target.files)
        // console.log(theFile)
    };

    const clearAttachment = () => {
        setAttachment(null)
    };

    return <div className={styles.container}>
        <div className={styles.days}>
            {days.map(day => (
                // isOwner={day.creatorId === userObj} = 로그인 정보 대조
                <Day key={day.id} dayObj={day} isOwner={day.creatorId === userObj.uid} />
            ))}
        </div>
        <form onSubmit={onSubmit} className={styles.dayForm}>
            <input className={styles.dayText} value={day} onChange={onChange} type="text" placeholder="" maxLength={500} />
            <input type="file" accept="image/*" onChange={onFileChange} />
            <input type="submit" value="diary" />
            {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={clearAttachment}>Cancel upload</button>
                </div>
            ) }
        </form>
    </div>
}

export default Home;