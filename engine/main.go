package main

import (
	"fmt"

	v8 "rogchap.com/v8go"
)

func main() {
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

	cpuProfiler.StartProfiling("my-profile")

	// ctx.RunScript("const add = (a, b) => a + b", "function1.js") // executes a script on the global context
	// ctx.RunScript("const sub = (a, b) => a - b", "function2.js") // executes a script on the global context
	// ctx.RunScript(`const loop = async () => {
	// 	let result = 0;
	// 	for(let i = 0;i < 1000000;i++){
	// 		await sleep(1000);
	// 		result += i;
	// 	}
	// 	return result;
	// }`, "loop.js") // executes a script on the global context

	// ctx.RunScript(`
	// const result = add(3, 4);
	// const result2 = sub(2, 1);
	// let result3;
	// loop().then((r) => {
	// 	result3 = r
	// });
	// getUserProfileByUserId('1');`, "main.js") // any functions previously added to the context can be called

	// val, _ := ctx.RunScript("result", "value.js")   // return a value in JavaScript back to Go
	// val2, _ := ctx.RunScript("result2", "value.js") // return a value in JavaScript back to Go
	// val3, _ := ctx.RunScript("result3", "value.js") // return a value in JavaScript back to Go

	// fmt.Printf("addition result: %+v \n", val)
	// fmt.Printf("addition result2: %s \n", val2)
	// fmt.Printf("addition result3: %s \n", val3)

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

	cpuProfile := cpuProfiler.StopProfiling("my-profile")

	printTree("", cpuProfile.GetTopDownRoot())
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
