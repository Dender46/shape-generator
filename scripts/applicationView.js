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

    get gravity() {
        return Number(this.gravityInput.value);
    }

    get shapesPerSecond() {
        return Number(this.shapesPerSecondInput.value);
    }

    get view() {
        return this.app.view;
    }

    get stage() {
        return this.app.stage;
    }
}