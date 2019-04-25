import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {getFullFaceDescription, loadModels, labels} from '../../api/face';
import './TrainModel.css'
import {restElement} from "@babel/types";

export default class TrainModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
    }

    componentWillMount = async () => {
        await loadModels().then(res => console.log('models loaded'))
    };

    readInTrainingData = async (acceptedFiles) => {
        let res = [];

        await this.asyncForEach(acceptedFiles, async (file) => {
            await this.handleImage(file).then(result => {
                res.push(result);
            })
        });
        console.log(res);
    };

    asyncForEach = async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    };

    onDrop = async (acceptedFiles) => {
        this.readInTrainingData(acceptedFiles);

        /*let result = [];
        await acceptedFiles.forEach(async __filename => {
            this.handleImage(__filename).then(res => {
                result.push(res);

            }).then(res => {
                console.log(result);
            })
        })*/
    };

    handleImage = async (__filename) => {
        let image = null;
        let imageURL = URL.createObjectURL(__filename);
        await getFullFaceDescription(imageURL).then(fullDesc => {
            if (!!fullDesc) {
                for (const label of labels) {
                    if (__filename.name.includes(label)) {
                        image = {label: (label), descriptor: (fullDesc.map(fd => fd.descriptor))};
                    }
                }
            }
        });
        return image;
    };

    render() {
        return (

            <div id="training-input" className="tab-pane  active">
                <Dropzone onDropAccepted={this.onDrop} multiple accept="image/*">
                    {({getRootProps, getInputProps, isDragActive, acceptedFiles}) => (
                        <section>
                            <div className="dropzone" {...getRootProps()}>
                                <input {...getInputProps()} />
                                <h4>{isDragActive ? "Drop it like it's hot!" : "Drag 'n' drop some files here, or click to select files used to train the model"}</h4>
                            </div>
                            <ul className="list-group mt-2">
                                {acceptedFiles.length > 0 && acceptedFiles.map(acceptedFile => (
                                    <li className="list-group-item list-group-item-success" key={acceptedFile.name}>
                                        {(acceptedFile.name)}
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

