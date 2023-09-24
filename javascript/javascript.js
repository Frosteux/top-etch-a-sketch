const sketchpad = document.querySelector('.mainSketchpad');
const sketchpadWidth = sketchpad.clientWidth;
const sketchpadHeight = sketchpad.clientHeight;
const userSelectedSize = '48'
const drawColor = 'red'

// Use the height and width of the sketchpad to determine what size the boxes inside it need to be.
const innerSketchpadBoxWidth = sketchpadWidth / +userSelectedSize;
const innerSketchpadBoxHeight = sketchpadHeight / +userSelectedSize;

// Build boxes based on the available space.
for(let i=0;i<+userSelectedSize*+userSelectedSize;i++){
    let innerBox = document.createElement('div');
    innerBox.style.border = '.1px solid white';
    innerBox.style.width = innerSketchpadBoxWidth + 'px';
    innerBox.style.height = innerSketchpadBoxHeight + 'px';
    innerBox.classList.add('sketchPadInside');
    innerBox.id=i; //id will be used to change a boxes color in another function
    sketchpad.appendChild(innerBox);

}

document.addEventListener('mousemove', function(e){
    const selectedBoxID = e.target.id;
    const selectedBox = document.getElementById(selectedBoxID);
    selectedBox.style.backgroundColor = drawColor;
});