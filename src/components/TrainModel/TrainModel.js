import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import './TrainModel.css'

export default class Home extends Component {
    //TODO: Write to JSON file
    onDrop = (acceptedFiles) => {
        console.log(acceptedFiles);
    }

    render() {
        return (
            <div id="training-input" className="tab-pane  active">
                <Dropzone onDrop={this.onDrop}>
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