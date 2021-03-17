/**
 * Provides a set of methods and properties
 * that can be used to measure elapsed time.
 */
export default class Stopwatch {
    private _initialDate = 0;
    private _isRunning = false;
    private _elapsedMilliseconds = 0;

    /**
     * Gets the total elapsed time measured by
     * the current instance, in milliseconds.
     */
    get elapsedMilliseconds() {
        return this._isRunning
            ? this._elapsedMilliseconds + new Date().valueOf() - this._initialDate
            : this._elapsedMilliseconds;
    }

    /**
     * Gets a value indicating whether the timer is running.
     */
    get isRunning() {
        return this._isRunning;
    }

    /**
     * Starts, or resumes, measuring elapsed time for an interval.
     */
    start() {
        if (!this._isRunning) {
            this._initialDate = new Date().valueOf();
            this._isRunning = true;
        }
    }

    /**
     * Stops measuring elapsed time for an interval.
     */
    stop() {
        if (this._isRunning) {
            this._elapsedMilliseconds += new Date().valueOf() - this._initialDate;
            this._isRunning = false;
        }
    }

    /**
     * Stops time interval measurement and resets the elapsed time to zero.
     */
    reset() {
        stop();
        this._elapsedMilliseconds = 0;
    }

    /**
     * Stops time interval measurement,
     * resets the elapsed time to zero,
     * and starts measuring elapsed time.
     */
    restart() {
        this.reset();
        this.start();
    }

    /**
     * Initializes a new Stopwatch instance,
     * sets the elapsed time property to zero,
     * and starts measuring elapsed time.
     */
    static startNew() {
        const stopwatch = new Stopwatch();
        stopwatch.start();
        return stopwatch;
    }
}
