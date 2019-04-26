import * as faceapi from 'face-api.js';

export const labels = ["femke", "frank", "lowie", "nancy", "olivia", "sam", "simonne", "waldek"];

// Load models and weights
export async function loadModels() {
    const MODEL_URL = process.env.PUBLIC_URL + '/models';
    await faceapi.loadFaceDetectionModel(MODEL_URL);
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
    return await faceapi.detectSingleFace(img).withFaceExpressions().withFaceLandmarks().withFaceDescriptor();
}

const maxDescriptorDistance = 0.5;

export async function createMatcher(faceProfile) {
    // Create labeled descriptors of member from profile
    let members = Object.keys(faceProfile);
    let labeledDescriptors = members.map(
        member =>
            new faceapi.LabeledFaceDescriptors(
                faceProfile[member].name,
                faceProfile[member].descriptors.map(
                    descriptor => new Float32Array(descriptor)
                )
            )
    );

    // Create face matcher (maximum descriptor distance is 0.5)
    return new faceapi.FaceMatcher(
        labeledDescriptors,
        maxDescriptorDistance
    );
}
