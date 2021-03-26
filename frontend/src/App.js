import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/Homepage/Home'
import Forum from './pages/Forum/Forum'
import AboutUs from './pages/AboutUs/AboutUs'

import './assets/scss/_main.scss'

function App () {

    return (
     <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/sobre-nos" component={AboutUs}/>
            <Route exact path="/conversas" component={Forum}/>
        </Switch>
     </BrowserRouter>   
    );
}

export default App;