import React, {Component} from 'react';
import {Route, Router} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import './App.css';

import Home from './components/Home/Home';
import ImageInput from './components/ImageInput/ImageInput'
import TrainModel from "./components/TrainModel/TrainModel";


class App extends Component {
    render() {
        return (
            <div className="App">
                <Router history={createHistory()}>
                    <div className=" route container-fluid text-center">
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/image" component={ImageInput} />
                        <Route exact path="/train" component={TrainModel} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;