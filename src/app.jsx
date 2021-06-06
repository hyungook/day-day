import AppRouter from 'components/router';
import Auth from 'components/routes/auth';
import React, { useEffect, useState } from 'react';
// import { Router, Route, Switch } from "react-router-dom";
// location 오류를 해결하기 위해 아래와 같이 코드 수정
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/login/login';
import firebase, {authService} from './firebase';

const App = () => {
  
  // 로그인 확인을 위한 상태
  const [init, setInit] = useState(false);

  // 현재 사용자 정보
  // console.log(authService.currentUser)

  // 현재 사용자를 useState에 넣는다
  // const [isSignIn, setSignIn] = useState(authService.currentUser);
  const [isSignIn, setSignIn] = useState(false);
  
  const [userObj, setUserObj] = useState(null);

  // setInterval(() => {
  //   console.log(authService.currentUser);
  // },2000)

  useEffect(() => {
    // event listenr, 유저 상태에 변화가 있을 때 그 변화를 알아차린다.
    authService.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setSignIn(true);
        setUserObj(user);
      } else {
        setSignIn(false);
      }
      setInit(true);
    })
  },[])

  return (
    <>
      {/* <Router>
        <Switch>
          {isSignIn ? (
            <>
                home
            </>
          ) : (
            <Route exact path="/">
              <Auth />
            </Route>
          )}
        </Switch>
      </Router> */}
      {/* <Auth /> */}
      {init ? <AppRouter isSignIn={isSignIn} userObj={userObj}/> : "Initializing ..."}
      <footer>&copy; {new Date().getFullYear()} Day Day</footer>
    </>
  );
}

export default App;