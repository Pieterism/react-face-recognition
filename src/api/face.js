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
    return await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();
}

const maxDescriptorDistance = 0.5;

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
        maxDescriptorDistance
    );
}