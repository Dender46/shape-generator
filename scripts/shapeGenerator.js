// Singleton class to generate shapes

var ShapeGenerator = (function() {
    var _instance;

    const _shapeVertices = [
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

    var generateShape = () => {
        let shape = null;
        let shapeProps = {
            x: 0, 
            y: 0,
            rotation: 0.5 + Math.random() * 1.75,
            color: '0x' + Math.floor(Math.random()*16777215).toString(16)
        };

        // figuring out what next shape should be generated: polygonal, elipse, cirlce, weird one
        let whatShapeToGen = Math.floor(Math.random() * Math.floor(_shapeVertices.length + 3));
        if (whatShapeToGen == _shapeVertices.length) {
             // generate circle
            shapeProps.sizeX = shapeProps.sizeY = Math.random() * 16 + 36
            shape = new Ellipse(shapeProps);
        } else if (whatShapeToGen == _shapeVertices.length + 1) {
             // generate ellipse
            shapeProps.sizeX = Math.random() * 16 + 24;
            shapeProps.sizeY = Math.random() * 16 + 46;
            shape = new Ellipse(shapeProps);
        } else if (whatShapeToGen == _shapeVertices.length + 2) {
            // generate weird shape
            shapeProps.rotation = 0;
            shape = new WeirdShape(shapeProps);
        } else {
            // generate polygonal shape
            shapeProps.vertices = _shapeVertices[whatShapeToGen];
            shapeProps.size = 0.5 + Math.random() * 1.75;
            shape = new Polygon(shapeProps);
        }

        return shape;
    }

    var createInstance = () => {
        return {
            generateShape: generateShape
        };
    }
 
    return {
        getInstance: function() {
            return _instance || (_instance = createInstance());
        }
    };
})();