import React from 'react';
// import { Redirect, Route, Router, Switch } from 'react-router';
// import { BrowserRouter as Redirect, Router, Route, Switch } from 'react-router-dom';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Auth from './routes/auth';

const AppRouter =  ({isSignIn}) => {
    
    return(
        <Router>
            {/* {isSignIn && <Navigation userObj={userObj} />} */}
            <Switch>
                {isSignIn ? (
                <div>
                    <Route exact path="/">
                        home
                    </Route>
                    <Route exact path="/profile">
                        profile
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