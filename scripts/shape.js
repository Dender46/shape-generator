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
    constructor(props) {
        this.shape = new PIXI.Graphics();
        this.shape.interactive = true;
        this.shape.buttonMode = true;

        this.shape.x = props.x;
        this.shape.y = props.y;
        this.shape.rotation = props.rotation || 0;

        this.time = 0;
        this.props = props;
    }

    get color() {return this.props.color;}
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

        super(props);
        
        this.shape.beginFill(props.color);
        this.shape.drawPolygon(props.vertices);
        this.shape.endFill();

        this.shape.hitArea = new PIXI.Polygon(props.vertices);
    }
}

class Ellipse extends Shape {
    constructor(props) {
        super(props);
        
        this.shape.beginFill(props.color);
        this.shape.drawEllipse(0, 0, props.sizeX, props.sizeY);
        this.shape.endFill();

        this.shape.hitArea = new PIXI.Ellipse(0, 0, props.sizeX, props.sizeY);
    }
}

class WeirdShape extends Shape {
    constructor(props) {
        props.rotation = 0;
        super(props);
        
        this.shape.beginFill(props.color);
        let max  = Math.floor(Math.random()*7+5) ;
        for (let i = 0; i < max; i++) {
            let size = Math.floor(Math.random()*55);
            let x = Math.floor(Math.random()*60-30);
            let y = Math.floor(Math.random()*60-30);
            this.shape.drawEllipse(x, y, size, size);
        }
        this.shape.endFill();

        let bounds = this.shape.getBounds();
        this.shape.hitArea = new PIXI.Rectangle(bounds.x, bounds.y, bounds.width, bounds.height);
    }
}

// for debugging
class Point extends Shape {
    constructor(x, y) {
        super({x: x, y: y, color: '0xffffff'});
        
        this.shape.beginFill('0xffffff');
        this.shape.drawPolygon([-2, -2, 2, -2, 2, 2, -2,  2,]);
        this.shape.endFill();
    }
}