function main() {
    //Create a Pixi Application
    let app = new PIXI.Application({width: 256, height: 256});
    
    //Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(app.view);
    
    let triangle = new Polygon(64,64, 0x66FF33, shapeVertices[3]);
    
    app.stage.addChild(triangle.shape);
}

window.onload = main;