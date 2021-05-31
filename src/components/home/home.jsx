import React, { useEffect, useState } from 'react';
import { dbService } from '../../firebase'

const Home = ({ userObj }) => {

    // login 정보 확인
    // console.log(userObj)

    const [day, setDay] = useState("");
    const  [days, setDays] = useState([]);


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

    const onSubmit = async (event) => {
        event.preventDefault()
        await dbService.collection("dayday").add({
            text:day,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        })
        setDay("")
        // console.log(day)
    }

    const onChange = (event) => {
        const {target:{value},} = event;
        setDay(value)
    };

    // console.log(days)

    return <div>
        <form onSubmit={onSubmit}>
            <input value={day} onChange={onChange} type="text" placeholder="" maxLength={120} />
            <input type="submit" value="diary" />
        </form>
        <div>
            {days.map(day => (
                <div key={day.id}>
                    <h4>{day.text}</h4>
                </div>
            ))}
        </div>
    </div>
}

export default Home;