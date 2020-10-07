class ApplicationView {
    constructor(appProps) {
        this.app = new PIXI.Application(appProps);
        document.body.appendChild(this.app.view);

        this.numberOfShapes = document.getElementById('shapesNum');
        this.shapesArea = document.getElementById('shapesArea');

        this.shapesPerSecond = document.getElementById('shapesPerSecondInput');
        this.shapesPerSecondBttns = {
            '+': document.getElementById('sps+'),
            '-': document.getElementById('sps-'),
        };

        this.gravity = document.getElementById('gravityInput');
        this.gravityBttns = {
            '+': document.getElementById('g+'),
            '-': document.getElementById('g-'),
        };
    }

    get view() {
        return this.app.view;
    }

    get stage() {
        return this.app.stage;
    }
}