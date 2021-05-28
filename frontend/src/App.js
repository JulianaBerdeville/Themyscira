import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Homepage/Home';
import Forum from './pages/Forum/Forum';
import AboutUs from './pages/AboutUs/AboutUs';
import ForumTopic from './pages/ForumTopic/ForumTopic';
import ForumPost from './pages/ForumPost/ForumPost';
import ContactUs from './pages/ContactUs/ContactUs';
import Login from './pages/Authentication/Login/Login';
import SignIn from './pages/Authentication/SignIn/SignIn';
import PasswordRecovery from './pages/Authentication/PasswordRecovery/PasswordRecovery';
import PasswordReset from './pages/Authentication/PasswordReset/PasswordReset';

import './assets/scss/_main.scss';

function App() {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/criar-conta" component={SignIn} />
                <Route exact path="/recuperacao-senha" component={PasswordRecovery} />
                <Route exact path="/reset-senha" component={PasswordReset} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/sobre-nos" component={AboutUs} />
                <Route exact path="/fale-conosco" component={ContactUs} />
                <Route exact path="/conversas" component={Forum} />
                <Route exact path="/conversa" component={ForumTopic} />
                <Route exact path="/criar-conversa" component={ForumPost} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;