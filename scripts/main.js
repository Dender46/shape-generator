let model = new ShapeModel();
let appView = new ApplicationView({width: 600, height: 300, model: model});
let controller = new ApplicationController(model, appView);