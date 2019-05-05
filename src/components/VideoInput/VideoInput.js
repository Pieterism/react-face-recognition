import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {loadModels} from '../../api/face';
import ReactPlayer from "react-player";
import './VideoInput.css'
const captureFrame = require('capture-frame')


// Initial State
const INIT_STATE = {
    videoURL: '',
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
            videoURL: '',
            frame: null,
            internalPlayer: null
        };
        this.reactPlayerRef = React.createRef();
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
        await this.handleVideoFrame(this.player.getInternalPlayer());

    };

    handleVideoFrame = async (internalPlayer) => {
        setInterval(async function () {
            //TODO: Capture frame and convert to image to analyse
            const buf = captureFrame(internalPlayer);
            const image = document.createElement('img')
            image.src = window.URL.createObjectURL(new window.Blob([buf]));
            document.body.appendChild(image)
        }, 500)
    };

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
                        playing = {true}
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