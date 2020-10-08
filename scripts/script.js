let model = new ShapeModel();
let appView = new ApplicationView({width: 512, height: 256, model: model});
let controller = new ApplicationController(model, appView);