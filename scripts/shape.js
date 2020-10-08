const shapeVertices = [
    [
         0, -32,
         32, 32,
        -32, 32
    ], [
        -32, -32,
         32, -32,
         32,  32,
        -32,  32,
    ], [
         0,  -32,
        -30, -10,
        -19,  26,
         19,  26,
         30, -10,
    ], [
         16, -28,
        -16, -28,
        -32,  0,
        -16,  28,
         16,  28,
         32,  0,
    ],
];

class Shape {
    constructor(x, y) {
        this.shape = new PIXI.Graphics();

        this.shape.x = x;
        this.shape.y = y;
    }

    get y() {
        return this.shape.y;
    }

    get x() {
        return this.shape.x;
    }

    set y(val) {
        this.shape.y = val;
    }

    set x(val) {
        this.shape.x = val;
    }
}

class Polygon extends Shape {
    constructor(x, y, color, verticesArr) {
        super(x, y);
        
        this.shape.beginFill(color);
        this.shape.drawPolygon(verticesArr);
        this.shape.endFill();
    }
}

class Ellipse extends Shape{
    constructor(x, y, color, sizeX, sizeY) {
        super(x, y);
        
        this.shape.beginFill(color);
        ellipse.drawEllipse(0, 0, sizeX, sizeY);
        this.shape.endFill();
    }
}