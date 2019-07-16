let classifier;

let img;
let imgPath = 'images/bird.png';

function modelReady() {
  console.log("Model is ready!!");
  predict();
}

function setup() {
  createCanvas(400, 400);
  imgLoad();
  classifier = ml5.imageClassifier('MobileNet', modelReady);
}

function imgLoad() {
  clear();
  img = loadImage(imgPath, () => { image(img, 0, 0, width, height) });
  image(img, 0, 0);
}

function predict() {
  classifier.predict(img, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    document.getElementById("label").innerHTML = results[0].label.toUpperCase();

  }
}

function previewFile() {
  var file = document.querySelector('input[type=file]').files[0];
  var reader = new FileReader();

  reader.onloadend = function () {
    imgPath = reader.result;
    imgLoad();
    predict();
  }

  if (file) {
    reader.readAsDataURL(file);

  }
}
