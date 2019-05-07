import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {loadModels, getFullFaceDescription} from '../../api/face';

// Initial State
const INIT_STATE = {
    imageURL: "https://cdn4.iconfinder.com/data/icons/social-communication/142/add_photo-512.png",
    fullDesc: null,
    detections: null,
    descriptors: null,
    expressions: null,
    match: null
};

class ImageInput extends Component {
    constructor(props) {
        super(props);
        this.state = {...INIT_STATE, faceMatcher: null};
    }

    componentWillMount = async () => {
        await loadModels();
        await this.handleImage(this.state.imageURL);
    };

    handleImage = async (image = this.state.imageURL) => {
        await getFullFaceDescription(image).then(fullDesc => {
            if (!!fullDesc) {
                this.setState({
                    fullDesc,
                    detections: fullDesc.map(fd => fd.detection),
                    descriptors: fullDesc.map(fd => fd.descriptor),
                    expressions: fullDesc.map(fd => fd.expressions)
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

    handleFileChange = async event => {
        this.resetState();
        await this.setState({
            imageURL: URL.createObjectURL(event.target.files[0]),
            loading: true,
            faceMatcher: this.props.faceMatcher
        });
        await this.handleImage();
    };

    resetState = () => {
        this.setState({...INIT_STATE});
    };


    render() {
        const {imageURL, detections, expressions, match} = this.state;

        let emotionsBox = null;
        if (!!expressions) {
            emotionsBox = expressions.map((expression, i) => {
                let emotions = [];
                Object.entries(expression).map(([key, value], i) => {
                    emotions.push(value);
                });
                return (
                    <div key={i}>
                        {emotions.map(emotion => <p
                            key={emotion.expression}> {emotion.expression}: {(emotion.probability * 100).toFixed(2)}%</p>)}
                    </div>
                )
            })
        }

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
                            {!!match ? (
                                <div
                                    style={{
                                        backgroundColor: 'blue',
                                        border: 'solid',
                                        borderColor: 'blue',
                                        width: 'inherit',
                                        marginTop: 0,
                                        color: '#fff',
                                        transform: `translate(-3px,${_H}px)`
                                    }}
                                >
                                    <p>{match[i]._label}</p>
                                    {emotionsBox[i]}
                                </div>
                            ) : null}
                        </div>
                    </div>
                );
            });
        }

        return (
            <div id="image-input" className="tab-pane fade text-center">
                <input
                    id="myFileUpload"
                    type="file"
                    onChange={this.handleFileChange}
                    accept=".jpg, .jpeg, .png"
                />
                <div style={{position: 'relative'}}>
                    <div style={{position: 'absolute'}}>
                        <img src={imageURL} alt="imageURL"/>
                    </div>
                    {!!drawBox ? drawBox : null}
                </div>
            </div>
        );
    }
}

export default withRouter(ImageInput);