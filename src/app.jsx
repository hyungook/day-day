import Auth from 'components/routes/auth';
import React, { useState } from 'react';
// import { Router, Route, Switch } from "react-router-dom";
// location 오류를 해결하기 위해 아래와 같이 코드 수정
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/login/login';
import firebase, {authService} from './firebase';

const App = () => {
  
  // 현재 사용자 정보
  console.log(authService.currentUser)
  // 현재 사용자를 useState에 넣는다
  const [isSignIn, setSignIn] = useState(authService.currentUser);

  return (
    <>
      <Router>
        <Switch>
          {isSignIn ? (
            <>
              {/* <Route exact path="/"> */}
                home
              {/* </Route> */}
            </>
          ) : (
            <Route exact path="/">
              <Auth />
            </Route>
          )}
        </Switch>
      </Router>
      {/* <Login isSignIn={isSignIn}/> */}
      <footer>&copy; {new Date().getFullYear()} Day Mood</footer>
    </>
  );
}

export default App;