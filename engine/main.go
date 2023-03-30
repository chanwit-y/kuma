package main

import (
	"fmt"

	v8 "rogchap.com/v8go"
)

func main() {
	ctx := v8.NewContext()                                       // creates a new V8 context with a new Isolate aka VM
	ctx.RunScript("const add = (a, b) => a + b", "function1.js") // executes a script on the global context
	ctx.RunScript("const sub = (a, b) => a - b", "function2.js") // executes a script on the global context

	ctx.RunScript(`const result = add(3, 4);const result2 = sub(2, 1)`, "main.js") // any functions previously added to the context can be called

	val, _ := ctx.RunScript("result", "value.js")   // return a value in JavaScript back to Go
	val2, _ := ctx.RunScript("result2", "value.js") // return a value in JavaScript back to Go

	fmt.Printf("addition result: %s \n", val)
	fmt.Printf("addition result2: %s \n", val2)
}
