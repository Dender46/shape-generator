class ApplicationController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.app.ticker.add(delta => this.gameLoop(delta));
    }
    
    gameLoop(delta) {
        this.model.shapes.forEach((e, i, a) => {
           a[i].y += this.view.gravity * delta;
        });
    }

    addShape(shape) {
        this.model.addShape(shape);
        this.view.stage.addChild(shape.shape);
    }
}