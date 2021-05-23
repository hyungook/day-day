import { authService } from "../../firebase";
import React, { useState } from "react";

const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // 
    const [newAccount, setAccount] = useState(true);

    const onChange = (event) => {
        // 쉽게 Form을 컨트롤 할 수 있는 방법
        // console.log(event.target.name)
        const {target:{name, value},} = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    const onSubmit = async(event) =>{
        
        event.preventDefault();

        try {

            let data;

            if(newAccount) {
                // create account
                // 계정이 없을 때 새로운 계정 생성
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                // sign in
                data = await authService.signInWithEmailAndPassword(email, password)
            console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
        
    }
    
    return ( 
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
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