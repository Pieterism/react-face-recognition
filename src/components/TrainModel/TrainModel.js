import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {getFullFaceDescription, loadModels, labels} from '../../api/face';
import './TrainModel.css'

export default class TrainModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images:{
                label: null,
                descriptors: []
            }
        };
    }

    componentWillMount = async () => {
        await loadModels();
    };

    //TODO: Write to JSON file
    onDrop = (acceptedFiles) => {
        acceptedFiles.forEach(__filename => {
            this.handleImage(__filename);
        })
    }

    handleImage = async (__filename) => {
        let imageURL = URL.createObjectURL(__filename);
        await getFullFaceDescription(imageURL).then(fullDesc => {
            if (!!fullDesc) {
                this.setState({
                    images: {descriptor: (fullDesc.map(fd => fd.descriptor))}
                });
            }
        });
        console.log(this.state);
    };

    render() {
        return (

            <div id="training-input" className="tab-pane  active">
                <Dropzone onDrop={this.onDrop} multiple accept="image/*">
                    {({getRootProps, getInputProps, isDragActive, acceptedFiles}) => (
                        <section>
                            <div className="dropzone" {...getRootProps()}>
                                <input {...getInputProps()} />
                                <h4>{isDragActive ? "Drop it like it's hot!" : "Drag 'n' drop some files here, or click to select files used to train the model"}</h4>
                            </div>
                            <ul className="list-group mt-2">
                                {acceptedFiles.length > 0 && acceptedFiles.map(acceptedFile => (
                                    <li className="list-group-item list-group-item-success">
                                        {acceptedFile.name}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </Dropzone>
            </div>
        );
    }
}

