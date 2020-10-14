class ApplicationController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Binding callbacks for user interaction
        this.view.bindShapesGenerationFrequency(this.handleGenerationFrequencyChange);
        this.view.bindGravity(this.handleGravityChange);
        this.view.bindOnCanvasClick(this.generateShapeOnClick);

        // This is used to not spawn shape immediately after clicking on other shape
        this.justDeletedShape = false;

        // Add functions with timers
        // They are for generating shapes and calculating area that all shapes occupying
        TimerHandler.getInstance().addTimerFunction(this.generateShape, () => 1000 / this.generationFrequency );
        TimerHandler.getInstance().addTimerFunction(this.calcShapesArea, () => 75 );

        // Main loop that changes y-position of al shapes due to gravity
        // also sets "Number of shapes" field
        this.view.app.ticker.add(delta => this.gameLoop(delta));
    }
    
    get gravity() {
        return Number(this.view.gravityInput.value);
    }

    // Generation frequency at which shapes are generated
    get generationFrequency() {
        return Number(this.view.generationFrequencyInput.value);
    }

    // Function that is called at interval and generates random shape and places it
    // on top of canvas and at x-position at [0; canvasWidth)
    generateShape = () => {
        let shape = ShapeGenerator.getInstance().generateShape();
        shape.x = Math.random() * this.view.width;
        shape.y = -shape.height;
        this.addShape(shape);
    }

    // Calculates area occupied by all shapes on the canvas. Called at interval
    calcShapesArea = () => {
        // Get texture of rendered area and all pixels of it in 1-dimensional array
        let canvasTexture = this.view.canvasTexture;
        let allPixels = this.view.app.renderer.plugins.extract.pixels(canvasTexture);
        canvasTexture.destroy(true); // required to prevent memory leaks

        // divide value by 4 because allPixels == 4 * width * height
        this.view.shapesArea.textContent = Math.floor(allPixels.filter(el => el > 0).length / 4);
    }

    // Main loop that changes y-position of al shapes due to gravity
    // also sets "Number of shapes" field
    gameLoop(delta) {
        this.view.numberOfShapes.textContent = this.model.numberOfShapes;

        for (let [key, value] of this.model.shapes.entries()) {
            value.forEach((element, index, array) => {
                array[index].time += delta;
                array[index].y += this.gravity * array[index].time;
                
                if (array[index].y - array[index].height > this.view.height)
                    this.deleteShape(array[index]);
            });
        }
    }

    // Callback which is set on canvas
    generateShapeOnClick = (e) => {
        // Checker to prevent spawning shape immediately after clicking on other shape
        if (this.justDeletedShape) {
            this.justDeletedShape = false;
            return;
        }
        let shape = ShapeGenerator.getInstance().generateShape();
        
        // Get x,y relative to canvas position and place shape on mouse position
        let rect = e.currentTarget.getBoundingClientRect();
        shape.x = e.clientX - rect.left;
        shape.y = e.clientY - rect.top;
        this.addShape(shape);
    }

    // Adds shape to model and on canvas. Also sets callback of clicking on shape
    addShape(shape) {
        shape.shape.on('pointerdown', (e) => this.handleOnShapeClick(e, shape));

        this.model.addShape(shape);
        this.view.app.stage.addChild(shape.shape);
    }

    // Removes shape from model and view safely without memory leaks
    deleteShape(shape) {
        this.view.app.stage.removeChild(shape.shape);
        this.model.deleteShape(shape);
    }
    
    // Function that checks hit area of weird shapes, because they don't have correct hitArea (it's hitarea is basically a rectangle)
    _checkHitAreaOfWeirdShape = (shape, x, y) => {
        // localBounds are used to find x and y mouse position relative to shape, instead of canvas
        let rect = shape.shape.getLocalBounds();
        x = Math.floor(x - rect.x - shape.x - 1);
        y = Math.floor(y - rect.y - shape.y - 1);

        let width = Math.floor(rect.width);
        // Get texture of rendered shape and all pixels of it in 1-dimensional array
        let texture = this.view.app.renderer.generateTexture(shape.shape, undefined, undefined, shape.shape.getBounds());
        let pixels = this.view.app.renderer.plugins.extract.pixels(texture);
        texture.destroy(true);

        // checking if mouse clicked on pixel that belongs to shape via color
        return pixels[y * (width * 4) + x * 4] == PIXI.utils.hex2rgb(shape.color)[0]*255;
    }

    // Callback to when mouse is clicked on shape
    handleOnShapeClick(e, shape) {
        // WeirdShapes need special case of handling 
        if (shape.type == ShapeTypes.WEIRD_SHAPE && !this._checkHitAreaOfWeirdShape(shape, e.data.global.x, e.data.global.y))
            return;
        
        // Set random color to all shapes of similar type
        this.model.shapes.get(shape.type).forEach((element, index, array) => {
            array[index].setRandomColor();
        });

        e.stopPropagation(); // don't delete shapes that are overlapped by current shape
        this.deleteShape(shape);
        this.justDeletedShape = true;
    }

    // Callback for handling change of generation frequency 
    handleGenerationFrequencyChange = (frequencyInput, operation) => {
        let oldValue = Number(frequencyInput.value);
        let newValue = operation == '+' ? oldValue + 1 : oldValue - 1;
        frequencyInput.value = Math.max(1.0, newValue);
    }

    // Callback for handling change of gravity value
    handleGravityChange = (gravityInput, operation) => {
        let oldValue = Number(gravityInput.value);
        let newValue = operation == '+' ? oldValue + 0.01 : oldValue - 0.01;
        gravityInput.value = Math.max(0.0, newValue.toPrecision(2));
    }
}