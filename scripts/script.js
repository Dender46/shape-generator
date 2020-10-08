//Create a Pixi Application
let randomColor = '0x' + Math.floor(Math.random()*16777215).toString(16);
let triangle = new Polygon(0,-64, randomColor, shapeVertices[3]);

let model = new ShapeModel();
let appView = new ApplicationView({width: 512, height: 256, model: model});
let controller = new ApplicationController(model, appView);

controller.addShape(triangle);