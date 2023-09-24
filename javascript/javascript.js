const sketchpad = document.querySelector('.mainSketchpad');
const sketchpadWidth = sketchpad.offsetWidth;
const sketchpadHeight = sketchpad.offsetHeight;
const userSelectedSize = '16'

// Use the height and width of the sketchpad to determine what size the boxes inside it need to be.
const innerSketchpadBoxWidth = sketchpadWidth / +userSelectedSize;
const innerSketchpadBoxHeight = sketchpadHeight / +userSelectedSize;

// Build boxes based on the available space.
for(let i=0;i<+userSelectedSize*+userSelectedSize;i++){
    let innerBox = document.createElement('div');
    innerBox.style.border = '.1px solid blue';
    innerBox.style.width = innerSketchpadBoxWidth + 'px';
    innerBox.style.height = innerSketchpadBoxHeight + 'px';
    innerBox.classList.add('sketchPadInside');
    sketchpad.appendChild(innerBox);

}
console.log(innerSketchpadBoxHeight);
console.log(innerSketchpadBoxWidth);