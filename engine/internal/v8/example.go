package v8

import (
	"fmt"

	v8 "rogchap.com/v8go"
)

func main() {
	demoCallJSFunction()
	demoCallJSPromiseFunction()
}

func demoCallJSFunction() {
	iso := v8.NewIsolate() // create a new VM
	// a template that represents a JS function
	getUserProfileByUserId := v8.NewFunctionTemplate(iso, func(info *v8.FunctionCallbackInfo) *v8.Value {
		userId := info.Args()[0]
		fmt.Printf("userId: %v \n", userId) // when the JS function is called this Go callback will execute
		return nil                          // you can return a value back to the JS caller if required
	})
	global := v8.NewObjectTemplate(iso)                          // a template that represents a JS Object
	global.Set("getUserProfileByUserId", getUserProfileByUserId) // sets the "print" property of the Object to our function

	ctx := v8.NewContext(iso, global)
	cpuProfiler := v8.NewCPUProfiler(iso)

	cpuProfiler.StartProfiling("demo-call-js-function")

	ctx.RunScript("const add = (a, b) => a + b", "function1.js") // executes a script on the global context
	ctx.RunScript("const sub = (a, b) => a - b", "function2.js") // executes a script on the global context

	ctx.RunScript(`
	const result = add(3, 4);
	const result2 = sub(2, 1);
	getUserProfileByUserId('1');`, "main.js") // any functions previously added to the context can be called

	val, _ := ctx.RunScript("result", "value.js")   // return a value in JavaScript back to Go
	val2, _ := ctx.RunScript("result2", "value.js") // return a value in JavaScript back to Go

	fmt.Printf("addition result: %+v \n", val)
	fmt.Printf("addition result2: %s \n", val2)

	cpuProfile := cpuProfiler.StopProfiling("demo-call-js-function")
	printTree("demo-call-js-function", cpuProfile.GetTopDownRoot())

}

func demoCallJSPromiseFunction() {
	iso := v8.NewIsolate()              // create a new VM
	global := v8.NewObjectTemplate(iso) // a template that represents a JS Object

	ctx := v8.NewContext(iso, global)
	cpuProfiler := v8.NewCPUProfiler(iso)

	cpuProfiler.StartProfiling("demo-call-js-promise-function")

	script := `
	async function myAsyncFunction() {
	//   await sleep(2000);
	  return 'test sleep';
	}
      
	myAsyncFunction();
      `
	promiseVal, _ := ctx.RunScript(script, "example.js")
	p, _ := promiseVal.AsPromise()
	v := p.Result()

	fmt.Printf("result: %+v \n", v)

	cpuProfile := cpuProfiler.StopProfiling("demo-call-js-promise-function")

	printTree("demo-call-js-promise-function", cpuProfile.GetTopDownRoot())
}

func printTree(nest string, node *v8.CPUProfileNode) {
	fmt.Printf("%s%s %s:%d:%d\n", nest, node.GetFunctionName(), node.GetScriptResourceName(), node.GetLineNumber(), node.GetColumnNumber())
	count := node.GetChildrenCount()
	if count == 0 {
		return
	}
	nest = fmt.Sprintf("%s  ", nest)
	for i := 0; i < count; i++ {
		printTree(nest, node.GetChild(i))
	}
}
