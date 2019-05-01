import React, {Component} from 'react';

import NavPills from "../NavPills/NavPills";
import ImageInput from "../ImageInput/ImageInput";
import VideoInput from "../VideoInput/VideoInput";
import TrainModel from "../TrainModel/TrainModel";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {faceProfiles: null};
    }

    callback = (classifiedData) =>
        this.setState( prevState => ( {
            faceProfiles: classifiedData,
        } ) );

    render() {
        return (
            <div className="container">
                <h1>React Face Recognition</h1>
                <NavPills/>
                <div className="tab-content">
                    <ImageInput faceProfiles={this.state.faceProfiles} />
                    <VideoInput/>
                    <TrainModel callback={this.callback.bind(this)}/>
                </div>
            </div>
        );
    }
}