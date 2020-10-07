function main() {
    //Create a Pixi Application
    let app = new PIXI.Application({width: 256, height: 256});
    
    //Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(app.view);

    let triangle = new Shape(180, 22, 0x66FF33, [
        -32, 64,             //First point
        32, 64,              //Second point
        0, 0                 //Third point
    ]);
    
    app.stage.addChild(triangle.shape);
}

window.onload = main;