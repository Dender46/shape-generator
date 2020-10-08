class ApplicationController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.app.ticker.add(delta => this.gameLoop(delta));
        
        this.generateShape = this.generateShape.bind(this);
        setTimeout(this.generateShape, 1000 / this.view.shapesPerSecond);
    }
    
    gameLoop(delta) {
        this.model.shapes.forEach((e, i, a) => {
            a[i].time += delta;
            a[i].y += this.view.gravity * a[i].time;
            
            if (a[i].y > this.view.height)
                this.deleteShape(a[i]);
        });
    }

    generateShape() {
        let x = Math.random() * this.view.width;
        let y = -64;
        let color = '0x' + Math.floor(Math.random()*16777215).toString(16);
        let vertices = shapeVertices[Math.floor(Math.random() * Math.floor(shapeVertices.length))];
        let shape = new Polygon(x, y, color, vertices);

        this.addShape(shape);
        setTimeout(this.generateShape, 1000 / this.view.shapesPerSecond);
        console.log('as', 1000 / this.view.shapesPerSecond);
    }

    addShape(shape) {
        this.model.addShape(shape);
        this.view.stage.addChild(shape.shape);

        shape.shape.on('pointerdown', (fn) => this.deleteShape(shape));
    }

    deleteShape(shape) {
        this.model.deleteShape(shape);
        this.view.stage.removeChild(shape.shape);
    }
}