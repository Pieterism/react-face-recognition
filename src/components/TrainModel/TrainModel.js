import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {getFullFaceDescription, loadModels} from '../../api/face';
import './TrainModel.css'

export default class TrainModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            descriptors: []
        };
    }

    componentWillMount = async () => {
        await loadModels();
    };

    //TODO: Write to JSON file
    onDrop = (acceptedFiles) => {
        acceptedFiles.forEach(__filename => {
            let imageURL = URL.createObjectURL(__filename);
            this.handleImage(imageURL);
            console.log(imageURL);
        })

        console.log(acceptedFiles);
    }

    handleImage = async (image) => {
        await getFullFaceDescription(image).then(fullDesc => {
            if (!!fullDesc) {
                this.setState({
                    descriptors: this.state.descriptors.concat(fullDesc.map(fd => fd.descriptor))
                });
            }
        });
    };

    render() {
        return (
            <div id="training-input" className="tab-pane  active">
                <Dropzone onDrop={this.onDrop} multiple accept="image/*">
                    {({getRootProps, getInputProps, isDragActive}) => (
                        <section>
                            <div className="dropzone" {...getRootProps()}>
                                <input {...getInputProps()} />
                                <h4>{isDragActive ? "Drop it like it's hot!" : "Drag 'n' drop some files here, or click to select files used to train the model"}</h4>
                            </div>
                        </section>
                    )}
                </Dropzone>
            </div>
        );
    }
}

