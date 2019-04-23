import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { loadModels, getFullFaceDescription } from '../../api/face';

// Import image to test API
const testImg = require('../../dataset/frank.jpg');

// Initial State
const INIT_STATE = {
    imageURL: testImg,
    fullDesc: null
};

class ImageInput extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INIT_STATE };
    }

    componentWillMount = async () => {
        await loadModels();
        await this.handleImage(this.state.imageURL);
    };

    handleImage = async (image = this.state.imageURL) => {
        await getFullFaceDescription(image).then(fullDesc => {
            console.log(fullDesc);
            this.setState({ fullDesc });
        });
    };

    render() {
        const { imageURL } = this.state;

        return (
            <div id="image-input" className="tab-pane fade in active">
                <h3>image input</h3>
                <img src={imageURL} alt="imageURL" />
            </div>
        );
    }
}

export default withRouter(ImageInput);