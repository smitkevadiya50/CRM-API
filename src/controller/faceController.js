/* const fs = require('fs');
const path = require('path');
const faceapi = require('face-api.js');
const canvas = require('canvas');
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

async function loadModels() {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk('models');
  await faceapi.nets.faceRecognitionNet.loadFromDisk('models');
  await faceapi.nets.faceLandmark68Net.loadFromDisk('models');
}

async function detectFace(req, res) {
  
  const inputImage = await canvas.loadImage(req.file.path);
  const detections = await faceapi.detectAllFaces(inputImage).withFaceLandmarks().withFaceDescriptors();

  if (!detections.length) {
    return res.status(404).send('No faces detected');
  }

  const profilesPath = path.join(__dirname, '../../uploads/profile');
  const profileFiles = fs.readdirSync(profilesPath);

  let matchedUserId = null;

  for (const file of profileFiles) {
    const profileImage = await canvas.loadImage(path.join(profilesPath, file));
    const profileDetections = await faceapi.detectAllFaces(profileImage).withFaceLandmarks().withFaceDescriptors();

    if (!profileDetections.length) continue;

    const faceMatcher = new faceapi.FaceMatcher(profileDetections);
    const bestMatch = faceMatcher.findBestMatch(detections[0].descriptor);

    if (bestMatch.distance < 0.6) {
      matchedUserId = path.parse(file).name;
      break;
    }
  }

  if (matchedUserId) {
    res.send({ userId: matchedUserId });
  } else {
    res.status(404).send('No matching face found');
  }
}

module.exports = {
  detectFace,
  loadModels
};
 */