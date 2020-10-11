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
    constructor(x = 0, y = 0, rotation = 0) {
        this.shape = new PIXI.Graphics();
        this.shape.interactive = true;
        this.shape.buttonMode = true;

        this.shape.x = x;
        this.shape.y = y;
        this.shape.rotation = rotation;
    }

    get width() {return this.shape.getBounds().width;}
    get height() {return this.shape.getBounds().height;}

    get y() {return this.shape.y;}
    get x() {return this.shape.x;}

    set y(val) {this.shape.y = val;}
    set x(val) {this.shape.x = val;}
}

class Polygon extends Shape {
    constructor(props) {
        props.vertices = props.vertices.map(e => e * props.size);

        super(props.x, props.y, props.rotation);
        
        this.shape.beginFill(props.color);
        this.shape.drawPolygon(props.vertices);
        this.shape.endFill();

        this.shape.hitArea = new PIXI.Polygon(props.vertices);

        this.time = 0;
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