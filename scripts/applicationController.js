class ApplicationController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // binding callbacks for user interaction
        this.view.bindShapesGenerationFrequency(this.handleGenerationFrequencyChange);
        this.view.bindGravity(this.handleGravityChange);
        this.view.bindOnCanvasClick(this.generateShapeOnClick);

        // This is used to not spawn shape immediately after clicking on other shape
        this.justDeletedShape = false;

        // Add functions with timers
        TimerHandler.getInstance().addTimerFunction(this.generateShape, () => 1000 / this.shapesPerSecond );
        TimerHandler.getInstance().addTimerFunction(this.calcShapesArea, () => 75 );

        // Main loop
        this.view.app.ticker.add(delta => this.gameLoop(delta));
    }
    
    get gravity() {
        return Number(this.view.gravityInput.value);
    }

    get shapesPerSecond() {
        return Number(this.view.shapesPerSecondInput.value);
    }

    generateShape = () => {
        let shape = this._getRandomShape();
        shape.x = Math.random() * this.view.width;
        shape.y = -shape.height;
        this.addShape(shape);
    }

    calcShapesArea = () => {
        // Get texture of rendered area and all pixels of it in 1-dimensional array
        let canvasTexture = this.view.canvasTexture;
        let allPixels = this.view.app.renderer.plugins.extract.pixels(canvasTexture);
        canvasTexture.destroy(true); // required to prevent memory leaks

        // divide value by 4 because allPixels == 4 * width * height
        this.view.shapesArea.textContent = Math.floor(allPixels.filter(el => el > 0).length / 4);
    }

    gameLoop(delta) {
        this.view.numberOfShapes.textContent = this.model.shapes.length;

        this.model.shapes.forEach((element, index, array) => {
            array[index].time += delta;
            array[index].y += this.gravity * array[index].time;
            
            if (array[index].y - array[index].height > this.view.height)
                this.deleteShape(array[index]);
        });
    }

    generateShapeOnClick = (e) => {
        // Checker to prevent spawning shape immediately after clicking on other shape
        if (this.justDeletedShape) {
            this.justDeletedShape = false;
            return;
        }
        let shape = this._getRandomShape();
        
        // Get x,y relative to canvas position
        let rect = e.currentTarget.getBoundingClientRect();
        shape.x = e.clientX - rect.left;
        shape.y = e.clientY - rect.top;
        this.addShape(shape);
    }

    addShape(shape) {
        this.model.addShape(shape);
        this.view.app.stage.addChild(shape.shape);

        shape.shape.on('pointerdown', (e) => {
            if (shape instanceof WeirdShape && !this._checkHitAreaOfWeirdShape(shape, e.data.global.x, e.data.global.y))
                return;
            
            e.stopPropagation();
            this.deleteShape(shape);
            this.justDeletedShape = true;
        });
    }

    deleteShape(shape) {
        this.view.app.stage.removeChild(shape.shape);
        this.model.deleteShape(shape);
    }
    
    // because weird shapes don't have correct hitArea (it's basically a rectangle)
    _checkHitAreaOfWeirdShape = (shape, x, y) => {
        let rect = shape.shape.getLocalBounds();
        x = Math.floor(x - rect.x - shape.x - 1);
        y = Math.floor(y - rect.y - shape.y - 1);

        let width = Math.floor(rect.width);
        let texture = this.view.app.renderer.generateTexture(shape.shape, undefined, undefined, shape.shape.getBounds());
        let pixels = this.view.app.renderer.plugins.extract.pixels(texture);
        texture.destroy(true);

        return pixels[y * (width * 4) + x * 4] == PIXI.utils.hex2rgb(shape.color)[0]*255;
    }

    handleGenerationFrequencyChange = (frequencyInput, operation) => {
        let oldValue = Number(frequencyInput.value);
        let newValue = operation == '+' ? oldValue + 1 : oldValue - 1;
        frequencyInput.value = Math.max(1.0, newValue);
    }

    handleGravityChange = (gravityInput, operation) => {
        let oldValue = Number(gravityInput.value);
        let newValue = operation == '+' ? oldValue + 0.01 : oldValue - 0.01;
        gravityInput.value = Math.max(0.0, newValue.toPrecision(2));
    }

    _getRandomShape() {
        let shape = null;
        let shapeProps = {
            x: 0, 
            y: 0,
            rotation: 0.5 + Math.random() * 1.75,
            color: '0x' + Math.floor(Math.random()*16777215).toString(16)
        };

        // figuring out what next shape should be generated: polygonal, elipse, cirlce, weird one
        let whatShapeToGen = Math.floor(Math.random() * Math.floor(shapeVertices.length + 3));
        if (whatShapeToGen == shapeVertices.length) {
             // generate circle
            shapeProps.sizeX = shapeProps.sizeY = Math.random() * 16 + 36
            shape = new Ellipse(shapeProps);
        } else if (whatShapeToGen == shapeVertices.length + 1) {
             // generate ellipse
            shapeProps.sizeX = Math.random() * 16 + 24;
            shapeProps.sizeY = Math.random() * 16 + 46;
            shape = new Ellipse(shapeProps);
        } else if (whatShapeToGen == shapeVertices.length + 2) {
            // generate weird shape
            shapeProps.rotation = 0;
            shape = new WeirdShape(shapeProps);
        } else {
            // generate polygonal shape
            shapeProps.vertices = shapeVertices[whatShapeToGen];
            shapeProps.size = 0.5 + Math.random() * 1.75;
            shape = new Polygon(shapeProps);
        }

        return shape;
    }
}