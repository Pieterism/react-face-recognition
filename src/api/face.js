import * as faceapi from 'face-api.js';

export const labels = ["femke", "frank", "lowie", "nancy", "olivia", "sam", "simonne", "waldek"];

// Load models and weights
export async function loadModels() {
    const MODEL_URL = process.env.PUBLIC_URL + '/models';
    await faceapi.loadFaceDetectionModel(MODEL_URL);
    await faceapi.loadMtcnnModel(MODEL_URL);
    await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
    await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);
    await faceapi.loadFaceLandmarkModel(MODEL_URL);
    await faceapi.loadFaceRecognitionModel(MODEL_URL);
    await faceapi.loadFaceExpressionModel(MODEL_URL);
}

export async function getFullFaceDescription(blob) {
    // fetch image to api
    let img = await faceapi.fetchImage(blob);

    // detect all faces and generate full description from image
    // including landmark and descriptor of each face
    return await faceapi
        .detectAllFaces(img)
        .withFaceExpressions()
        .withFaceLandmarks()
        .withFaceDescriptors();
}

export async function getSingleFaceDescription(blob) {
    // fetch image to api
    let img = await faceapi.fetchImage(blob);

    // detect all faces and generate full description from image
    // including landmark and descriptor of each face
    return await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();
}

//TODO: faster face detection using tiny model
export async function getTinyFullFaceDescription(blob) {
    // fetch image to api
    let img = await faceapi.fetchImage(blob);

    return await faceapi
        .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks(true)
        .withFaceDescriptors()
}

export async function getMtcnnFullFaceDescription(blob) {
    // fetch image to api
    let img = await faceapi.fetchImage(blob);

    return await faceapi
        .detectAllFaces(img, new faceapi.MtcnnOptions())
        .withFaceLandmarks()
        .withFaceDescriptors()
}

export async function createMatcher(faceProfiles) {
    console.log('Creating face matcher...');

    const labeledFaceDescriptors = [];

    await faceProfiles.forEach(async faceProfile => {
        const descriptors = [];
        for (let i = 0; i < faceProfile.descriptors.length; i++) {
            descriptors.push(faceProfile.descriptors[i])
        }
        const labeledDescriptor = await new faceapi.LabeledFaceDescriptors(faceProfile.name, descriptors)
        labeledFaceDescriptors.push(labeledDescriptor);
    });

    // Create face matcher (maximum descriptor distance is 0.5)
    return new faceapi.FaceMatcher(
        labeledFaceDescriptors,
    );
}