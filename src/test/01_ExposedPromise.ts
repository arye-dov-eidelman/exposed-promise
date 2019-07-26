import {ExposedPromise} from "../ExposedPromise"
import {expect} from "../expect"


expect("(Sample test) ExposedPromise initial state is pending", () => {
	let ep = new ExposedPromise(new Promise(resolve=>setTimeout(resolve, 100)))
	return {itPassed: ep.state === "pending"}
})
