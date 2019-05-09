import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {getTinyFullFaceDescription, loadModels} from '../../api/face';
import ReactPlayer from "react-player";
import './VideoInput.css'

const captureFrame = require('capture-frame');

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
        this.handleVideo = this.handleVideo.bind(this);
        this.analyseImageFrame = this.analyseImageFrame.bind(this);
    }

    componentWillMount = async () => {
        await loadModels();
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleFileChange = async event => {
        this.resetState();
        await this.setState({
            videoURL: URL.createObjectURL(event.target.files[0]),
            loading: true,
            faceMatcher: this.props.faceMatcher,
            internalPlayer: this.player.getInternalPlayer()
        });

        //handle image
        await this.handleVideo();

    };

    handleVideo = async () => {
        this.interval = setInterval(async () => {
            await this.analyseImageFrame();
        }, 500)
    };

    analyseImageFrame = async () => {
        const buf = captureFrame(this.player.getInternalPlayer());
        const image = document.createElement('img');
        image.src = window.URL.createObjectURL(new window.Blob([buf], {type: 'image/png'}));
        await getTinyFullFaceDescription(image.src).then(fullDesc => {
            if (!!fullDesc) {
                this.setState({
                    fullDesc,
                    detections: fullDesc.map(fd => fd.detection),
                    descriptors: fullDesc.map(fd => fd.descriptor)
                });
            }
        });

        if (!!this.state.descriptors && !!this.state.faceMatcher) {
            let match = await this.state.descriptors.map(descriptor =>
                this.state.faceMatcher.findBestMatch(descriptor)
            );
            this.setState({match});
        }
    };

    resetState = () => {
        this.setState({...INIT_STATE});
    };

    render() {
        const {detections, match} = this.state;

        let drawBox = null;
        if (!!detections) {
            drawBox = detections.map((detection, i) => {
                let _H = detection.box.height;
                let _W = detection.box.width;
                let _X = detection.box._x;
                let _Y = detection.box._y;
                return (
                    <div key={i}>
                        <div
                            style={{
                                position: 'absolute',
                                border: 'solid',
                                borderColor: 'blue',
                                height: _H,
                                width: _W,
                                transform: `translate(${_X}px,${_Y}px)`
                            }}
                        >
                            {!!match && !!match[i] ? (
                                <p
                                    style={{
                                        backgroundColor: 'blue',
                                        border: 'solid',
                                        borderColor: 'blue',
                                        width: _W,
                                        marginTop: 0,
                                        color: '#fff',
                                        transform: `translate(-3px,${_H}px)`
                                    }}
                                >
                                    <b>{match[i]._label}</b>
                                </p>
                            ) : null}
                        </div>
                    </div>
                );
            });
        }
        return (
            <div id="video-input" className="tab-pane fade">
                <input
                    id="myFileUpload"
                    type="file"
                    onChange={this.handleFileChange}
                    accept=".mp4, .webm, .wav"
                />
                <div className='player-wrapper'>
                    <div style={{position: 'relative'}}>
                        <div style={{position: 'absolute'}}>
                            <ReactPlayer
                                className='react-player'
                                url={this.state.videoURL}
                                width='100%'
                                height='100%'
                                controls={true}
                                playing={true}
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
                        {!!drawBox ? drawBox : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(VideoInput);