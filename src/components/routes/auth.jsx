import { authService, firebaseInstance } from "../../firebase";
import React, { useState } from "react";

const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // 
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

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
            console.log(data);
        } catch (error) {
            console.log(error);
            console.log(error.code);
            console.log(error.message);
            setError(error.message);
        }
    }

    const toggleAccount = () => {
        setNewAccount((prev) => !prev);
    }
    
    const onSocialClick = async (event) => {
        // console.log(event.target.name);
        const {target:{name}} = event;
        let provider;
        if(name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data)
    };
    
    return ( 
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
                {error}
            </form>
            <div>
            <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
                <button name="google" onClick={onSocialClick}>
                    Continue with Google
                </button>
                <button name="github" onClick={onSocialClick}>
                    Continue with Github
                </button>
            </div>
        </div>
    )}

export default Auth;