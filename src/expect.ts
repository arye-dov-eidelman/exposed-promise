export function expect(description: string, test: (() => { itPassed: Boolean, errorMessage?: string })){
	let itPassed, errorMessage

	try {
		({itPassed, errorMessage} = test());
	} catch (error) {
		itPassed = false;
		errorMessage = `The test failed to complete throwing a ${error.name} with the message \n{error.message}`
	}
	
	if(itPassed){
		console.log(`Passed: ${description}`)
	} else {
		console.log(`Failed: ${description}`)
		console.log(`Error: ${errorMessage}`)
	}
}
