// Singleton class to add functions that should be called with an interval.
// Saves time and space when there is such a function needed.

var TimerHandler = (function() {
    var _instance;
    var _functions = [];

    // Add timer to pool
    // Argument intervalGetter must be function that returns amount of milliseconds for func to be called
    var addTimerFunction = (func, intervalGetter) => {
        window.requestAnimationFrame(func);
        _functions.push({
            function: func,
            intervalGetter: intervalGetter,
            timestamp: undefined
        });
        return _functions.length - 1; // return index of function inside pool, to delete later for example
    }

    var removeTimerFunction = (index) => {
        _functions.splice(index, 1);
    }

    // Called each frame on a loop
    var _onFrame = (timestamp) => {
        for (let i = 0; i < _functions.length; i++) {
            
            let functionObj = _functions[i];
            if (functionObj.timestamp == undefined) // check if calling function first time
                functionObj.timestamp = timestamp;
            
            // checking if enough time of interval have passed
            const elapsed = timestamp - functionObj.timestamp;
            if (elapsed < functionObj.intervalGetter())
                continue;
            
            // calling function and saving time when it was called
            functionObj.timestamp = timestamp;
            window.requestAnimationFrame(functionObj.function);
        }
        
        // keeping _onFrame function looping
        window.requestAnimationFrame(_onFrame);
    }

    var createInstance = () => {
        window.requestAnimationFrame(_onFrame); // starting _onFrame loop
        return {
            addTimerFunction: addTimerFunction,
            removeTimerFunction: removeTimerFunction,
        };
    }
 
    return {
        getInstance: function() {
            return _instance || (_instance = createInstance());
        }
    };
})();