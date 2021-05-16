import React from 'react';
import GoogleButton from '../../GoogleLogin';
import { KakaoLogin } from '../../KakaoLogin';

const Login = (props) => {
    return (
        <div>
            <h1>Day Mood Login</h1>
            <GoogleButton />
            {/* <KakaoSignUp /> */}
            {/* <KakaoLogin /> */}
        </div>
    )
};

export default Login;