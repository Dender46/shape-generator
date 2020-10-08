class ApplicationController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.app.ticker.add(delta => this.gameLoop(delta));
    }
    
    gameLoop(delta) {
        this.model.shapes.forEach((e, i, a) => {
            a[i].time += delta;
            a[i].y += this.view.gravity * a[i].time;
            
            if (a[i].y > this.view.height)
                this.deleteShape(a[i]);
        });
    }

    addShape(shape) {
        this.model.addShape(shape);
        this.view.stage.addChild(shape.shape);
        shape.shape.on('pointerup', (fn) => this.deleteShape(shape));
    }

    deleteShape(shape) {
        this.model.deleteShape(shape);
        this.view.stage.removeChild(shape.shape);
    }
}