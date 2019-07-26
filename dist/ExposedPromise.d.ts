/**
 * Exposes promise state and result to non async code.
 */
export declare class ExposedPromise<PromiseResult> {
    /**
     * The promise being exposed.
     */
    readonly promise: Promise<any>;
    /**
     * Callbacks for when the promise's state changes.
     */
    readonly callbacks: Function[];
    private _state;
    private _result;
    readonly then: Function;
    readonly catch: Function;
    readonly finally: Function;
    /**
     * @param promise The promise being exposed.
     * @param callbacks Callbacks for when the promise's state changes.
     * @returns An ExposedPromise.
     */
    constructor(promise: Promise<PromiseResult>, callbacks?: ExposedPromiseCallBacks<PromiseResult>);
    /**
     * @returns The state of the promise.
     */
    readonly state: PromiseState;
    /**
     * The result(/reason) of the promise if it resolved.
     */
    readonly result: PromiseResult | undefined;
    isFulfilled(): boolean;
    isNotFulfilled(): boolean;
    isRejected(): boolean;
    isNotRejected(): boolean;
    isPending(): boolean;
    isNotPending(): boolean;
    isSettled(): boolean;
    isNotSettled(): boolean;
    private handleFulfillment;
    private handleRejection;
    addCallBacks(callbacks: ExposedPromiseCallBacks<PromiseResult>): void;
    private runCallBacks;
}
interface ExposedPromiseCallBack<PromiseResult> {
    (exposedPromise: ExposedPromise<PromiseResult>): any;
}
declare type ExposedPromiseCallBacks<PromiseResult> = ExposedPromiseCallBack<PromiseResult> | ExposedPromiseCallBack<PromiseResult>[];
declare type PromiseState = "pending" | "fulfilled" | "rejected";
export {};
