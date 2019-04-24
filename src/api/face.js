import * as faceapi from 'face-api.js';


const path = require('path');
const fs = require('fs');

// Load models and weights
export async function loadModels() {
    const MODEL_URL = process.env.PUBLIC_URL + '/models';
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
    await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
    await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);
    await faceapi.loadFaceLandmarkModel(MODEL_URL);
    await faceapi.loadFaceRecognitionModel(MODEL_URL);
    await faceapi.loadFaceExpressionModel(MODEL_URL);
}


export async function getSingleFaceDescriptor(blob, inputSize = 512) {
    // tiny_face_detector options
    let scoreThreshold = 0.5;
    const OPTION = new faceapi.TinyFaceDetectorOptions({
        inputSize,
        scoreThreshold
    });
    const useTinyModel = true;

    // fetch image to api
    let img = await faceapi.fetchImage(blob);

    // detect all faces and generate full description from image
    // including landmark and descriptor of each face
    let faceDescriptor = await faceapi
        .detectSingleFace(img)
        .withFaceDescriptors();

    return faceDescriptor;
}

export async function getFullFaceDescription(blob, inputSize = 512) {

    // tiny_face_detector options
    let scoreThreshold = 0.5;
    const OPTION = new faceapi.TinyFaceDetectorOptions({
        inputSize,
        scoreThreshold
    });
    const useTinyModel = true;

    // fetch image to api
    let img = await faceapi.fetchImage(blob);

    // detect all faces and generate full description from image
    // including landmark and descriptor of each face
    let fullDesc = await faceapi
        .detectAllFaces(img)
        .withFaceExpressions()
        .withFaceLandmarks()
        .withFaceDescriptors();

    return fullDesc;
}