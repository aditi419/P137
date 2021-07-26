status = "";
objects = [];

function setup(){
    canvas = createCanvas(500,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start(){
   objectDetection = ml5.objectDetector('cocossd', modelLoaded);
   document.getElementById("status").innerHTML = "Status: Detecting Objects";
   value = document.getElementById("objectName").value;
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}

function draw(){
    image(video,0,0,500,400);

    if(status != ""){
        objectDetector.detect(gotResults);
        for(i = 0; i < objects.length; i++){
           percent = floor(objects[i].confidence * 100);
           text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
           document.getElementById("status").innerHTML = "Status: Objects Detected";
           document.getElementById("found").innerHTML = "The Number of Objects are " + objects.length;
           fill("#FF0000");
           noFill();
           stroke("#FF0000");
        }
     }
}

function gotResults(){
    objects = results;
}