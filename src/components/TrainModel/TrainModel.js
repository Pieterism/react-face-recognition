import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import './TrainModel.css'

export default class Home extends Component {

    render() {
        return (
            <div id="training-input" className="tab-pane  active">

                <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div className="dropzone" {...getRootProps()}>
                                <input {...getInputProps()} />
                                <h4>Drag 'n' drop some files here, or click to select files</h4>
                            </div>
                        </section>
                    )}
                </Dropzone>
            </div>
        );
    }
}