class ApplicationView {
    constructor(appProps) {
        this.app = new PIXI.Application(appProps);
        document.getElementById('shapesInfo').after(this.app.view);

        this.width = appProps.width;
        this.height = appProps.height;

        this.numberOfShapes = document.getElementById('shapesNum');
        this.shapesArea = document.getElementById('shapesArea');

        this.shapesPerSecondInput = document.getElementById('shapesPerSecondInput');
        this.shapesPerSecondBttns = {
            '+': document.getElementById('sps+'),
            '-': document.getElementById('sps-'),
        };
        
        this.gravityInput = document.getElementById('gravityInput');
        this.gravityBttns = {
            '+': document.getElementById('g+'),
            '-': document.getElementById('g-'),
        };
    }

    // WARNING: Returned textured must be deleted after being used to avoid memory leaks
    get canvasTexture() {
        let texture = this.app.renderer.generateTexture(this.app.stage, undefined, undefined, this.app.screen);
        return texture;
    }

    bindOnCanvasClick(handler) {
        this.app.view.onclick = handler;
    }

    bindShapesGenerationFrequency(handler) {
        this.shapesPerSecondBttns['+'].onclick = (event) => handler(this.shapesPerSecondInput, '+');
        this.shapesPerSecondBttns['-'].onclick = (event) => handler(this.shapesPerSecondInput, '-');
    }

    bindGravity(handler) {
        this.gravityBttns['+'].onclick = (event) => handler(this.gravityInput, '+');
        this.gravityBttns['-'].onclick = (event) => handler(this.gravityInput, '-');
    }
}