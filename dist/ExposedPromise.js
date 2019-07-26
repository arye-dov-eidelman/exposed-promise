"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Exposes promise state and result to non async code.
 */
class ExposedPromise {
    /**
     * @param promise The promise being exposed.
     * @param callbacks Callbacks for when the promise's state changes.
     * @returns An ExposedPromise.
     */
    constructor(promise, callbacks) {
        this.promise = promise;
        this._state = "pending";
        this.callbacks = [];
        this.then = this.promise.then;
        this.catch = this.promise.catch;
        this.finally = this.promise.finally;
        if (callbacks) {
            this.addCallBacks(callbacks);
        }
        this.promise.then(this.handleFulfillment, this.handleRejection)
            .finally(this.runCallBacks);
    }
    /**
     * @returns The state of the promise.
     */
    get state() {
        return this._state;
    }
    /**
     * The result(/reason) of the promise if it resolved.
     */
    get result() {
        return this._result;
    }
    isFulfilled() {
        return this._state === "fulfilled";
    }
    isNotFulfilled() {
        return this._state !== "fulfilled";
    }
    isRejected() {
        return this._state === "rejected";
    }
    isNotRejected() {
        return this._state !== "rejected";
    }
    isPending() {
        return this._state === "pending";
    }
    isNotPending() {
        return this._state !== "pending";
    }
    isSettled() {
        return this.isNotPending();
    }
    isNotSettled() {
        return this.isPending();
    }
    handleFulfillment(result) {
        this._result = result;
        this._state = "fulfilled";
    }
    handleRejection(result) {
        this._result = result;
        this._state = "rejected";
    }
    addCallBacks(callbacks) {
        if (typeof callbacks == "function") {
            this.callbacks.push(callbacks);
        }
        else {
            this.callbacks.push(...callbacks);
        }
    }
    runCallBacks() {
        this.callbacks.forEach(callback => callback(this));
    }
}
exports.ExposedPromise = ExposedPromise;
