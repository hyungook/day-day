import React, { useState } from 'react';

const Home = (props) => {

    const [day, setDay] = useState("");

    const onSubmit = (event) => {
        event.preventDefault()
        console.log(day)
    }

    const onChange = (event) => {
        const {target:{value},} = event;
        setDay(value)
    };

    return <div>
        <form onSubmit={onSubmit}>
            <input value={day} onChange={onChange} type="text" placeholder="" maxLength={120} />
            <input type="submit" value="diary" />
        </form>
    </div>
}

export default Home;