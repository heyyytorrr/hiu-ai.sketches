function setup() {
    canvas=createCanvas(300,300);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
}

function preload() {
    classifier=ml5.imageClassifier("DoodleNet");
}

function draw() {
    strokeWeight(15);
    stroke(0);
    if(mouseIsPressed) {
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}

function clearCanvas() {
    background("white");
}
function classifyCanvas() {
    classifier.classify(canvas,gotResult);
}

function gotResult(error,results) {
    if(error) {
        console.error(error)
    }
    console.log(results);
    document.getElementById("label").innerHTML=`Avaliação:${results[0].label}`;
    document.getElementById("confidence").innerHTML=`Probabilidade:${Math.round(results[0].confidence*100)}%`;
    utterThis=new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis)
}