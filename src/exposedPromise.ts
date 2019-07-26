/**
 * Exposes promise state and result to non async code.
 */
class ExposedPromise<PromiseResult> {

	/**
	 * The promise being exposed.
	 */
	readonly promise: Promise<any>

	/**
	 * Callbacks for when the promise's state changes.
	 */
	readonly callbacks: Function[]

	private _state: PromiseState
	private _result: PromiseResult | undefined

	readonly then: Function
	readonly catch: Function
	readonly finally: Function

	/**
	 * @param promise The promise being exposed.
	 * @param callbacks Callbacks for when the promise's state changes.
	 * @returns An ExposedPromise.
	 */
	constructor(
		promise: Promise<PromiseResult>,
		callbacks?: ExposedPromiseCallBacks<PromiseResult>
	) {
		this.promise = promise
		this._state = "pending"
		this.callbacks = []
		this.then = this.promise.then
		this.catch = this.promise.catch
		this.finally = this.promise.finally

		if (callbacks) {
			this.addCallBacks(callbacks)
		}

		this.promise.then(this.handleFulfillment, this.handleRejection)
			.finally(this.runCallBacks)
	}

	/**
	 * @returns The state of the promise.
	 */
	get state(): PromiseState {
		return this._state;
	}

	/**
	 * The result(/reason) of the promise if it resolved.
	 */
	get result(): PromiseResult | undefined {
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

	private handleFulfillment(result: PromiseResult) {
		this._result = result;
		this._state = "fulfilled";
	}

	private handleRejection(result: any) {
		this._result = result;
		this._state = "rejected";
	}

	addCallBacks(callbacks: ExposedPromiseCallBacks<PromiseResult>) {
		if (typeof callbacks == "function") {
			this.callbacks.push(callbacks);
		} else {
			this.callbacks.push(...callbacks);
		}
	}

	private runCallBacks() {
		this.callbacks.forEach(callback => callback(this));
	}
}

interface ExposedPromiseCallBack<PromiseResult> {
    (exposedPromise: ExposedPromise<PromiseResult>): any;
}
type ExposedPromiseCallBacks<PromiseResult> =
	ExposedPromiseCallBack<PromiseResult> |
	ExposedPromiseCallBack<PromiseResult>[]

type PromiseState = "pending" | "fulfilled" | "rejected"
