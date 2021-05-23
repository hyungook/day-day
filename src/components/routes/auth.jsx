import React, { useState } from "react";

const Auth = () => {

    const [email, setEmail] = useState("");
    const [passWord, setPassWord] = useState("");

    const onChange = (event) => {
        // 쉽게 Form을 컨트롤 할 수 있는 방법
        // console.log(event.target.name)
        const {target:{name, value},} = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassWord(value);
        }
    }

    const onSubmit = (event) =>{
        event.preventDefault();
    }
    
    return ( 
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="Password" required value={passWord} onChange={onChange} />
                <input type="submit" value='Login' />
            </form>
            <div>
                <button name="google">
                    Continue with Google
                </button>
                <button name="github">
                    Continue with Github
                </button>
            </div>
        </div>
    )}

export default Auth;