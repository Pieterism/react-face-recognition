import React, {Component} from 'react';

import NavPills from "../NavPills/NavPills";
import ImageInput from "../ImageInput/ImageInput";
import VideoInput from "../VideoInput/VideoInput";
import TrainModel from "../TrainModel/TrainModel";

export default class Home extends Component {
    render() {
        return (
            <div className="container">
                <h1>React Face Recognition</h1>
                <NavPills/>
                <div className="tab-content">
                    <ImageInput />
                    <VideoInput/>
                    <TrainModel />
                </div>
            </div>
        );
    }
}