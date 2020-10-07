function main() {
    //Create a Pixi Application
    let appView = new ApplicationView({width: 512, height: 256});
    
    //Add the canvas that Pixi automatically created for you to the HTML document
    document.querySelector('#shapesInfo').after(appView.view);
    
    let randomColor = '0x' + Math.floor(Math.random()*16777215).toString(16);
    let triangle = new Polygon(64,64, randomColor, shapeVertices[3]);
    
    appView.stage.addChild(triangle.shape);
}

window.onload = main;