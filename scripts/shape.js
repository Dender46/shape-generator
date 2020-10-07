class Shape {
    constructor(x, y, color, verticesArr) {
        this.shape = new PIXI.Graphics();
        
        this.shape.beginFill(color);
        this.shape.drawPolygon(verticesArr);
        this.shape.endFill();

        this.shape.x = x;
        this.shape.y = y;
    }
}