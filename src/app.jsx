import AppRouter from 'components/router';
import Auth from 'components/routes/auth';
import React, { useEffect, useState } from 'react';
// import { Router, Route, Switch } from "react-router-dom";
// location 오류를 해결하기 위해 아래와 같이 코드 수정
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/login/login';
import firebase, {authService} from './firebase';
import './app.css';

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
      // console.log(user);
      if (user) {
        setSignIn(true);
        // setUserObj(user);

        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });

        // setUserObj(user);

      } else {
        setSignIn(false);
      }
      setInit(true);
    })
  },[])

  const refreshUser = () => {
    // setUserObj(authService.currentUser)
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid:user.uid,
      updateProfile: (args) => user.updateProfile(args)
    })

    // setUserObj(Object.assign({}, user));
    // Object.assign 은 target과 source가 요구된다.
    // 기본적으로 빈 object 와 source가 필요하다. 결과적으로 빈 object 안에 원래 user의 사본이 새 obejct의 형태로 생성된다.
    // 그렇기 때문에 react에서 반응하여 랜더링 된다. // 비추천

    // console.log(authService.currentUser.displayName)
  }

  return (
    <section className="section">
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
      {init ? <AppRouter refreshUser={refreshUser} isSignIn={isSignIn} userObj={userObj}/> : "Initializing ..."}
      {/* <footer>&copy; {new Date().getFullYear()} Day Day</footer> */}
    </section>
  );
}

export default App;