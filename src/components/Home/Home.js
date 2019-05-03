import React, {Component} from 'react';

import NavPills from "../NavPills/NavPills";
import ImageInput from "../ImageInput/ImageInput";
import VideoInput from "../VideoInput/VideoInput";
import TrainModel from "../TrainModel/TrainModel";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {faceMatcher: null};
    }

    callback = (faceMatcher) =>
        this.setState( prevState => ( {
            faceMatcher: faceMatcher,
        } ) );

    render() {
        return (
            <div className="container">
                <h1>React Face Recognition</h1>
                <NavPills/>
                <div className="tab-content">
                    <ImageInput faceMatcher={this.state.faceMatcher} />
                    <VideoInput faceMatcher={this.state.faceMatcher}/>
                    <TrainModel callback={this.callback.bind(this)}/>
                </div>
            </div>
        );
    }
}