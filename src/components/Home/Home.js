import React, {Component} from 'react';

import NavPills from "../NavPills/NavPills";
import ImageInput from "../ImageInput/ImageInput";
import VideoInput from "../VideoInput/VideoInput";

export default class Home extends Component {
    render() {
        return (
            <div className="container">
                <h1>React Face Recognition</h1>
                <NavPills/>
                <div className="tab-content">
                    <ImageInput/>
                    <VideoInput/>
                </div>
            </div>
        );
    }
}