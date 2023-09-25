const sketchpad = document.querySelector('.mainSketchpad');
const sketchpadWidth = sketchpad.clientWidth;
const sketchpadHeight = sketchpad.clientHeight;
const drawColor = document.querySelector('.userColor')
let rainbowMode = false;
let darkenMode = false;
let lightenMode = false;
let colorMode = false;

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

document.addEventListener('mouseover', function(e){
    const selectedBoxID = e.target.id;
    const selectedBox = document.getElementById(selectedBoxID);
    if(selectedBoxID!==null && selectedBox!==null){
        if(rainbowMode){
            const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
            selectedBox.style.backgroundColor = randomColor;
        } else if(colorMode) {
            selectedBox.style.backgroundColor = drawColor.value;
        } else if(lightenMode){
            if(selectedBox.style.backgroundColor!==null){
                const newColor =rgba2hex(selectedBox.style.backgroundColor);
                selectedBox.style.backgroundColor = newShade(newColor, 10);
            }
        } else if (darkenMode){
            if(selectedBox.style.backgroundColor!==null){
                const newColor =rgba2hex(selectedBox.style.backgroundColor);
                selectedBox.style.backgroundColor = newShade(newColor, -10);
            }
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

    darkenMode = false;
    rainbowMode = true;
    lightenMode = false;
    colorMode = false;

}

function darken(){

    darkenMode = true;
    rainbowMode = false;
    lightenMode = false;
    colorMode = false;
    
}

function lighten(){

    darkenMode = false;
    rainbowMode = false;
    lightenMode = true;
    colorMode = false;

}

function color(){

    darkenMode = false;
    rainbowMode = false;
    lightenMode = false;
    colorMode = true;

}

const newShade = (hexColor, magnitude) => {
    hexColor = hexColor.replace(`#`, ``);
    if (hexColor.length === 6) {
        const decimalColor = parseInt(hexColor, 16);
        let r = (decimalColor >> 16) + magnitude;
        r > 255 && (r = 255);
        r < 0 && (r = 0);
        let g = (decimalColor & 0x0000ff) + magnitude;
        g > 255 && (g = 255);
        g < 0 && (g = 0);
        let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
        b > 255 && (b = 255);
        b < 0 && (b = 0);
        return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
    } else {
        return hexColor;
    }
};

const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`
