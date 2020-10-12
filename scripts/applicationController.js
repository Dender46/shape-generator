class ApplicationController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // This is used to not spawn shape immediately after clicking on other shape
        this.justDeletedShape = false;

        // start loops to generate shapes per sec. and calculate area of shapes 
        this._generateShapeStart;
        this._calcShapesAreaStart;
        window.requestAnimationFrame(this.generateShape);
        window.requestAnimationFrame(this.calcShapesArea);
        
        this.view.view.onclick = this.generateShapeOnClick;

        // Main loop
        this.view.app.ticker.add(delta => this.gameLoop(delta));
    }
    
    generateShape = (timestamp) => {
        if (this._generateShapeStart == undefined)
            this._generateShapeStart = timestamp;
        const elapsed = timestamp - this._generateShapeStart;
        if (elapsed < 1000 / this.view.shapesPerSecond) {
            window.requestAnimationFrame(this.generateShape);
            return;
        }

        let shape = this._getRandomShape();
        shape.x = Math.random() * this.view.width;
        shape.y = -shape.height;
        this.addShape(shape);
        
        this._generateShapeStart = timestamp;
        window.requestAnimationFrame(this.generateShape);
    }

    calcShapesArea = (timestamp) => {
        if (this._calcShapesAreaStart == undefined)
            this._calcShapesAreaStart = timestamp;
        const elapsed = timestamp - this._calcShapesAreaStart;
        if (elapsed < 50) {
            window.requestAnimationFrame(this.calcShapesArea);
            return;
        }

        // Get texture of rendered area and all pixels of it in 1-dimensional array
        let canvasTexture = this.view.canvasTexture;
        let allPixels = this.view.app.renderer.plugins.extract.pixels(canvasTexture);
        canvasTexture.destroy(true); // required to prevent memory leaks

        // divide value by 4 because allPixels == 4 * width * height
        this.view.shapesArea.textContent = Math.floor(allPixels.filter(el => el > 0).length / 4);

        this._calcShapesAreaStart = timestamp;
        window.requestAnimationFrame(this.calcShapesArea);
    }

    gameLoop(delta) {
        this.view.numberOfShapes.textContent = this.model.shapes.length;

        this.model.shapes.forEach((element, index, array) => {
            array[index].time += delta;
            array[index].y += this.view.gravity * array[index].time;
            
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
        this.view.stage.addChild(shape.shape);

        shape.shape.on('pointerdown', (e) => {
            if (shape instanceof WeirdShape && !this._checkHitAreaOfWeirdShape(shape, e.data.global.x, e.data.global.y))
                return;
            
            e.stopPropagation();
            this.deleteShape(shape);
            this.justDeletedShape = true;
        });
    }

    deleteShape(shape) {
        this.view.stage.removeChild(shape.shape);
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