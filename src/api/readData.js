const path = require('path');
const fs = require('fs');
const fr = require('face-recognition');

const dataPath = path.resolve('./../dataset');
const labels = ['femke', 'frank', 'lowie', 'olivia', 'simonne', 'sam', 'waldek', 'nancy'];

const allFiles = fs.readdirSync(dataPath);

//filter input images per class
const imagesByClass = labels.map(c =>
    allFiles
        .filter(f => f.includes(c))
        .map(f => path.join(dataPath, f))
        .map(fp => fr.loadImage(fp))
);

//TODO: JSON MAKEN MET NAAM EN DESCRIPTORS
imagesByClass.forEach(imageClass => {
    let obj = {
        name: labels[imagesByClass.indexOf(imageClass)],
        images: [],
        descriptors: []
    }

    console.log(obj.name)
})





