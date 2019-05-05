import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {loadModels} from '../../api/face';
import ReactPlayer from "react-player";
import './VideoInput.css'
import 'capture-video-frame';


// Initial State
const INIT_STATE = {
    videoURL: 'https://www.youtube.com/watch?v=LrsBYF073VQ&t=3s',
    fullDesc: null,
    detections: null,
    descriptors: null,
    match: null
};

class VideoInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullDesc: null,
            detections: null,
            descriptors: null,
            faceMatcher: null,
            match: null,
            videoURL: 'https://www.youtube.com/watch?v=LrsBYF073VQ&t=3s',
            frame: null,
            internalPlayer: null
        };
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleVideoFrame = this.handleVideoFrame.bind(this);
    }

    componentWillMount = async () => {
        await loadModels();
    };

    handleFileChange = async event => {
        this.resetState();
        await this.setState({
            videoURL: URL.createObjectURL(event.target.files[0]),
            loading: true,
            faceMatcher: this.props.faceMatcher,
            internalPlayer: this.player.getInternalPlayer()
        });

        const internalPlayer = this.state.internalPlayer;

        //handle image
        await this.handleVideoFrame(internalPlayer);

    };

    handleVideoFrame = async (internalPlayer) => {
        setInterval( function () {
            console.log(internalPlayer)
        },3000)
    }

    resetState = () => {
        this.setState({...INIT_STATE});
    };

    render() {
        return (
            <div id="video-input" className="tab-pane fade">
                <input
                    id="myFileUpload"
                    type="file"
                    onChange={this.handleFileChange}
                    accept=".mp4, .webm, .wav"
                />

                <div className='player-wrapper'>
                    <ReactPlayer
                        className='react-player'
                        url={this.state.videoURL}
                        width='100%'
                        height='100%'
                        controls={true}
                        ref={player => {
                            this.player = player
                        }}
                        config={{
                            file: {
                                attributes: {
                                    crossOrigin: 'anonymous'
                                }
                            }
                        }}

                    />
                </div>
            </div>
        );
    }
}

export default withRouter(VideoInput);