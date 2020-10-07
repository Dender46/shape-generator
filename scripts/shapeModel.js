class ShapeModel {
    constructor() {
        this.shapes = [];
    }

    addShape(shape) {
        this.shapes.push(shape);
    }

    deleteShape(shape) {
        this.shapes.splice(this.shapes.findIndex(sh => sh == shape), 1);
    }

}