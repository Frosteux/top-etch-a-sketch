const sketchpad = document.querySelector('.mainSketchpad');
const sketchpadWidth = sketchpad.clientWidth;
const sketchpadHeight = sketchpad.clientHeight;
const drawColor = document.querySelector('.userColor')
let rainbowMode = false;

buildSketchGrid(32);

function buildSketchGrid(userSelectedSize){
    // Use the height and width of the sketchpad to determine what size the boxes inside it need to be.
    const innerSketchpadBoxWidth = sketchpadWidth / +userSelectedSize;
    const innerSketchpadBoxHeight = sketchpadHeight / +userSelectedSize;

    const removeBox = document.querySelectorAll(".sketchPadInside");
    removeBox.forEach(box => {
        box.remove();
    })
    
    // Build boxes based on the available space.
    for(let i=0;i<+userSelectedSize*+userSelectedSize;i++){
        let innerBox = document.createElement('div');
        innerBox.style.border = '.5px dotted darkgray';
        innerBox.style.width = innerSketchpadBoxWidth + 'px';
        innerBox.style.height = innerSketchpadBoxHeight + 'px';
        innerBox.classList.add('sketchPadInside');
        innerBox.id=i; //id will be used to change a boxes color in another function
        sketchpad.appendChild(innerBox);

    }
}

document.addEventListener('mousemove', function(e){
    const selectedBoxID = e.target.id;
    const selectedBox = document.getElementById(selectedBoxID);
    if(selectedBoxID!==null && selectedBox!==null){
        if(rainbowMode){
            const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
            selectedBox.style.backgroundColor = randomColor;
        } else {
        selectedBox.style.backgroundColor = drawColor.value;
        }
    }
});

let slider = document.getElementsByClassName("slider");
let output = document.getElementsByClassName("sliderValue");

output[0].innerText = slider[0].value;

slider[0].oninput = function() {
  output[0].innerHTML = this.value;
  buildSketchGrid(this.value);
}

function resetFunction(){
    const removeBox = document.querySelectorAll(".sketchPadInside");
    removeBox.forEach(box => {
        box.remove();
    })  
    let slider = document.getElementsByClassName("slider");
    let output = document.getElementsByClassName("sliderValue");
    let userColor = document.getElementsByClassName("userColor");

    output[0].innerText = "32";
    slider[0].value = "32";
    userColor[0].value="#c02eff";
    document.getElementsByClassName("rainbowMode")[0].checked = false;
    rainbowMode = false;
    buildSketchGrid(32);

}

function unleashTheRainbow(){
    if(rainbowMode){
        rainbowMode = false;
    } else {
        rainbowMode = true;
    }
}
