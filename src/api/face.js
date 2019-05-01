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

const maxDescriptorDistance = 0.5;

export async function createMatcher(faceProfiles) {

    console.log('CREATE FACE MATCHER');
    console.log(faceProfiles)

    let labeledDescriptors = [];

    

/*    faceProfiles.forEach(faceProfile =>{
        labeledDescriptors.push( new faceapi.LabeledFaceDescriptors(faceProfile.name, faceProfile.descriptor))
    })

   // Create face matcher (maximum descriptor distance is 0.5)
    return new faceapi.FaceMatcher(
        labeledDescriptors
    );
    */
}