// File that contains all shape variations

class Shape {
    constructor(props) {
        this.shape = new PIXI.Graphics();
        this.shape.interactive = true;
        this.shape.buttonMode = true;

        this.shape.x = props.x;
        this.shape.y = props.y;
        this.shape.rotation = props.rotation || 0;

        this.time = 0;
        this._type = '';
        this._color = props.color;
        
        this.setColor(props.color);
    }

    // Argument 'color' must be a hex number
    setColor(color) {
        let colorRGBArray = PIXI.utils.hex2rgb(color);
        let colorFilter = new PIXI.filters.ColorMatrixFilter();
        colorFilter.matrix[0]  = colorRGBArray[0];
        colorFilter.matrix[6]  = colorRGBArray[1];
        colorFilter.matrix[12] = colorRGBArray[2];
        this.shape.filters = [colorFilter];
    }

    setRandomColor() {
        let colorFilter = new PIXI.filters.ColorMatrixFilter();
        colorFilter.matrix[0]  = Math.random() * 0.01;
        colorFilter.matrix[6]  = Math.random() * 0.01;
        colorFilter.matrix[12] = Math.random() * 0.01;
        this.shape.filters = [colorFilter];
    }

    get type()  {return this._type;}
    get color() {return this._color;}
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
        
        this.shape.beginFill(0xffffff);
        this.shape.drawPolygon(props.vertices);
        this.shape.endFill();

        this.shape.hitArea = new PIXI.Polygon(props.vertices);

        switch(props.vertices.length / 2) {
            case 3: this._type = 'polygonal3'; break;
            case 4: this._type = 'polygonal4'; break;
            case 5: this._type = 'polygonal5'; break;
            case 6: this._type = 'polygonal6'; break;
        }
    }
}

class Ellipse extends Shape {
    constructor(props) {
        super(props);
        
        this.shape.beginFill(0xffffff);
        this.shape.drawEllipse(0, 0, props.sizeX, props.sizeY);
        this.shape.endFill();

        this.shape.hitArea = new PIXI.Ellipse(0, 0, props.sizeX, props.sizeY);

        this._type = props.sizeX == props.sizeY ? 'circle' : 'ellipse';
    }
}

class WeirdShape extends Shape {
    constructor(props) {
        props.rotation = 0;
        super(props);
        
        this.shape.beginFill(0xffffff);
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

        this._type = 'weird';
    }
}

// for debugging purposes only
class Point extends Shape {
    constructor(x, y) {
        super({x: x, y: y, color: 0xffffff});
        
        this.shape.beginFill(0xffffff);
        this.shape.drawPolygon([-2, -2, 2, -2, 2, 2, -2,  2,]);
        this.shape.endFill();
    }
}