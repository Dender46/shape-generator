function main() {
    //Create a Pixi Application
    let app = new PIXI.Application({width: 256, height: 256});
    
    //Add the canvas that Pixi automatically created for you to the HTML document
    document.querySelector('#shapesInfo').after(app.view);
    
    let randomColor = '0x' + Math.floor(Math.random()*16777215).toString(16);
    let triangle = new Polygon(64,64, randomColor, shapeVertices[3]);
    
    app.stage.addChild(triangle.shape);
}

window.onload = main;