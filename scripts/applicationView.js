class ApplicationView {
    constructor(appProps) {
        this.app = new PIXI.Application(appProps);
        document.getElementById('shapesInfo').after(this.app.view);

        this.width = appProps.width;
        this.height = appProps.height;

        this.numberOfShapes = document.getElementById('shapesNum');
        this.shapesArea = document.getElementById('shapesArea');

        this.shapesPerSecondInput = document.getElementById('shapesPerSecondInput');
        this.shapesPerSecondInput.onkeydown = this.handleInputChanges;
        this.shapesPerSecondInput.onkeyup = this.handleInputChanges;
        this.shapesPerSecondInput.onchange = this.handleInputChanges;
        this.shapesPerSecondBttns = {
            '+': document.getElementById('sps+'),
            '-': document.getElementById('sps-'),
        };
        this.shapesPerSecondBttns['+'].onclick = () => this.shapesPerSecondInput.value = Math.max(1.0, (this.shapesPerSecond + 1));
        this.shapesPerSecondBttns['-'].onclick = () => this.shapesPerSecondInput.value = Math.max(1.0, (this.shapesPerSecond - 1));

        
        this.gravityInput = document.getElementById('gravityInput');
        this.gravityInput.onkeydown = this.handleInputChanges;
        this.gravityInput.onkeyup = this.handleInputChanges;
        this.gravityInput.onchange = this.handleInputChanges;
        this.gravityBttns = {
            '+': document.getElementById('g+'),
            '-': document.getElementById('g-'),
        };
        this.gravityBttns['+'].onclick = () => this.gravityInput.value = Math.max(0.0, (this.gravity + 0.01).toPrecision(2));
        this.gravityBttns['-'].onclick = () => this.gravityInput.value = Math.max(0.0, (this.gravity - 0.01).toPrecision(2));
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

    // WARNING: Returned textured must be deleted after being used to avoid memory leaks
    get canvasTexture() {
        let texture = this.app.renderer.generateTexture(this.stage, undefined, undefined, this.app.screen);
        return texture;
    }

    handleInputChanges(e) {
        if (isNaN(Number(e.key))) {
            e.stopImmediatePropagation();
            return;
        }
        
        e.currentTarget.value = Math.max(0.0, e.currentTarget.value);
    }
}