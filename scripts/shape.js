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
        this.shape.interactive = true;
        this.shape.buttonMode = true;

        this.shape.x = x;
        this.shape.y = y;
    }

    get width() {return this.shape.width;}
    get height() {return this.shape.height;}

    get y() {return this.shape.y;}
    get x() {return this.shape.x;}

    set y(val) {this.shape.y = val;}
    set x(val) {this.shape.x = val;}
}

class Polygon extends Shape {
    constructor(props) {
        // coordinates of vertices originallprops.y are in the center of shape
        props.vertices = props.vertices.map(e => e + 32);
        props.vertices = props.vertices.map(e => e * props.size);

        super(props.x, props.y);
        
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