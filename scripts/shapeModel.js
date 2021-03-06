class ShapeModel {
    constructor() {
        // Using Map instead of Object because it has 
        // faster adding, deleting, finding performance
        this.shapes = new Map([
            [ShapeTypes.TRIANGLE,    []],
            [ShapeTypes.SQUARE,      []],
            [ShapeTypes.PENTAGON,    []],
            [ShapeTypes.HEXAGON,     []],
            [ShapeTypes.CIRCLE,      []],
            [ShapeTypes.ELLIPSE,     []],
            [ShapeTypes.WEIRD_SHAPE, []],
        ]); 
        this._numberOfShapes = 0;
    }

    get numberOfShapes() {
        return this._numberOfShapes;
    }

    addShape(shape) {
        this._numberOfShapes++;
        this.shapes.get(shape.type).push(shape);
    }

    deleteShape(shape) {
        this._numberOfShapes--;

        let index = this.shapes.get(shape.type).findIndex(sh => sh == shape);
        this.shapes.get(shape.type)[index].shape.destroy(); // clearing up to avoid memory leak
        // PIXI.utils.removeItems is slightly better then regular Array.prototype.splice
        PIXI.utils.removeItems(this.shapes.get(shape.type), index, 1);
    }

}