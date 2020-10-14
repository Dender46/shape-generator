class ApplicationView {
    constructor(appProps) {
        this.app = new PIXI.Application(appProps);
        document.getElementById(ConstStrings.SHAPES_INFO).after(this.app.view); // add canvas inbetween shapesInfo and 

        // this is used to prevent text selection of "Number of shapes per second" when clicking on canvas
        this.app.view.style['-webkit-user-select'] = 'none';  /* Chrome all / Safari all */
        this.app.view.style['-moz-user-select'] = 'none';     /* Firefox all */
        this.app.view.style['-ms-user-select'] = 'none';      /* IE 10+ */
        this.app.view.style['user-select'] = 'none';          /* Likely future */   

        this._width = appProps.width;
        this._height = appProps.height;

        this.numberOfShapes = document.getElementById(ConstStrings.SHAPES_NUM);
        this.shapesArea = document.getElementById(ConstStrings.SHAPES_AREA);

        this.generationFrequencyInput = document.getElementById(ConstStrings.GENERATION_FREQUENCY_INPUT);
        this.generationFrequencyBttns = {
            '+': document.getElementById(ConstStrings.GENERATION_FREQUENCY_PLUS),
            '-': document.getElementById(ConstStrings.GENERATION_FREQUENCY_MINUS),
        };
        
        this.gravityInput = document.getElementById(ConstStrings.GRAVITY_INPUT);
        this.gravityBttns = {
            '+': document.getElementById(ConstStrings.GRAVITY_PLUS),
            '-': document.getElementById(ConstStrings.GRAVITY_MINUS),
        };
    }

    get width()  {return this._width;}
    get height() {return this._height;}

    // WARNING: Returned textured must be deleted after being used to avoid memory leaks
    get canvasTexture() {
        let texture = this.app.renderer.generateTexture(this.app.stage, undefined, undefined, this.app.screen);
        return texture;
    }

    // These next functions are for binding callbacks from controller

    bindOnCanvasClick(handler) {
        this.app.view.onclick = handler;
    }

    bindShapesGenerationFrequency(handler) {
        this.generationFrequencyBttns['+'].onclick = (event) => handler(this.generationFrequencyInput, '+');
        this.generationFrequencyBttns['-'].onclick = (event) => handler(this.generationFrequencyInput, '-');
    }

    bindGravity(handler) {
        this.gravityBttns['+'].onclick = (event) => handler(this.gravityInput, '+');
        this.gravityBttns['-'].onclick = (event) => handler(this.gravityInput, '-');
    }
}