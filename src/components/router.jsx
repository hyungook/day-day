import React from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from './home/home';
import Navigation from './navigation/navigation';
import Profile from './profile/profile';
import Auth from './routes/auth';

const AppRouter =  ({refreshUser, isSignIn, userObj}) => {
    
    return(
        <Router>
            {isSignIn && <Navigation userObj={userObj} />}
            <Switch>
                {isSignIn ? (
                <div>
                    <Route exact path="/">
                        <Home userObj={userObj} />
                    </Route>
                    <Route exact path="/profile">
                        <Profile userObj={userObj} refreshUser={refreshUser} />
                    </Route>
                    <Redirect from="*" to="/" />
                </div>) : (
                    <>
                        <Route exact path="/">
                            <Auth />
                        </Route>
                        <Redirect from="*" to="/" />
                    </>
                    )}
            </Switch>
        </Router>
    )
}

export default AppRouter;