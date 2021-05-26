import React from 'react';
// import { Redirect, Route, Router, Switch } from 'react-router';
// import { BrowserRouter as Redirect, Router, Route, Switch } from 'react-router-dom';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from './home/home';
import Navigation from './navigation/navigation';
import Profile from './profile/profile';
import Auth from './routes/auth';

const AppRouter =  ({isSignIn}) => {
    
    return(
        <Router>
            {isSignIn && <Navigation />}
            <Switch>
                {isSignIn ? (
                <div>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/profile">
                        <Profile />
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