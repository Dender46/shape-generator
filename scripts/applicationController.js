class ApplicationController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // This is used to not spawn shape immediately when clicking on other shape
        this.justDeletedShape = false;

        this.generateShapeOnClick = this.generateShapeOnClick.bind(this);
        this.view.view.onclick = this.generateShapeOnClick;

        // Shape generation
        this.generateShape = this.generateShape.bind(this);
        setTimeout(this.generateShape, 1000 / this.view.shapesPerSecond);
        
        // Main loop
        this.view.app.ticker.add(delta => this.gameLoop(delta));
    }
    
    gameLoop(delta) {
        this.view.numberOfShapes.textContent = this.model.shapes.length;

        this.model.shapes.forEach((e, i, a) => {
            a[i].time += delta;
            a[i].y += this.view.gravity * a[i].time;
            
            if (a[i].y > this.view.height)
                this.deleteShape(a[i]);
        });
    }

    generateShapeOnClick(e) {
        if (this.justDeletedShape) {
            this.justDeletedShape = false;
            return;
        }
        
        let rect = e.currentTarget.getBoundingClientRect();
        
        let size = 0.5 + Math.random() * 1.75;
        let shape = new Polygon({
            x: e.clientX - rect.left - 32 * size,
            y: e.clientY - rect.top - 32 * size,
            size: size,
            color: '0x' + Math.floor(Math.random()*16777215).toString(16),
            vertices: shapeVertices[Math.floor(Math.random() * Math.floor(shapeVertices.length))]
        });
        this.addShape(shape);
    }

    generateShape() {
        let shape = new Polygon({
            x: Math.random() * this.view.width, 
            y: -128,
            size: 0.5 + Math.random() * 1.75,
            color: '0x' + Math.floor(Math.random()*16777215).toString(16),
            vertices: shapeVertices[Math.floor(Math.random() * Math.floor(shapeVertices.length))]
        });

        this.addShape(shape);
        setTimeout(this.generateShape, 1000 / this.view.shapesPerSecond);
    }

    addShape(shape) {
        this.model.addShape(shape);
        this.view.stage.addChild(shape.shape);

        shape.shape.on('pointerdown', (e) => {
            this.deleteShape(shape);
            this.justDeletedShape = true;
        });
    }

    deleteShape(shape) {
        this.model.deleteShape(shape);
        this.view.stage.removeChild(shape.shape);
    }
}