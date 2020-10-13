class ShapeModel {
    constructor() {
        // using Map instead of Object because it has 
        // faster adding, deleting, finding performance
        this.shapes = new Map([
            ['polygonal3',[]],
            ['polygonal4',[]],
            ['polygonal5',[]],
            ['polygonal6',[]],
            ['circle',    []],
            ['ellipse',   []],
            ['weird',     []],
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
        this.shapes.get(shape.type)[index].shape.destroy();
        PIXI.utils.removeItems(this.shapes.get(shape.type), index, 1);
    }

}