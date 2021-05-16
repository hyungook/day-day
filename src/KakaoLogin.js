import axios from "axios";

const kakaoAPI = "3878480fee4668963f62db0b9409b585";

export const KakaoLogin = (history) => {
  window.Kakao.Auth.login({
    success: (response) => {
      axios
        .get(`${kakaoAPI}/kakao`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: response.access_token,
          },
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          alert("로그인 되었습니다.");
          history.push("/");
        });
    },
    fail: (error) => {
      alert(JSON.stringify(error));
    },
  });
};

// export default KakaoLogin;

// import React, { Component } from 'react';
// import KaKaoLogin from 'react-kakao-login';

// const KakaoSignUp = () => {
//     // constructor(props) {
//     //     super(props);
//     //     this.state = {
//     //         data: 'kakao'
//     //     }
//     // }

//     const responseKaKao = (res) => {
//         this.setState({
//             data: res
//         })
//         alert(JSON.stringify(this.state.data))
//         console.log(res);
//     }

//     const responseFail = (error) => {
//         console.log(error);
//     }

//         return (
//             <>
//                 <form>
//                     {/* <StKaKaoLogin>
//                         <img src={img} alt="a" onClick={this.loginWithKakao} />
//                     </StKaKaoLogin> */}
//                     <br></br>
//                     <KaKaoLogin
//                         jsKey={'ae368809f8c58b049e9e5c6c9268631b'}
//                         buttonText="KaKao"
//                         onSuccess={this.responseKaKao}
//                         onFailure={this.responseFail}
//                         getProfile={true}
//                     />

//                 </form>

//             </>
//         );
//     }

// export default KakaoSignUp;
