class ShapeModel {
    constructor() {
        this.shapes = [];
    }

    addShape(shape) {
        this.shapes.push(shape);
    }

    deleteShape(shape) {
        let index = this.shapes.findIndex(sh => sh == shape);
        this.shapes[index].shape.destroy();
        PIXI.utils.removeItems(this.shapes, index, 1);
    }

}