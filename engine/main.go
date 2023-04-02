package main

import (
	"encoding/json"
	"engine/internal/api"
	http "engine/pkg/http"
	"fmt"
	"io/ioutil"

	aft "engine/internal/v8"

	v8 "rogchap.com/v8go"
)

func main() {
	acquireToken, _ := http.NewBanpuAcquireToken(false)
	httpClient := http.NewHttpClient(acquireToken)
	userProfileApi := api.NewUserProfileApi(httpClient)

	dataScript, _ := ioutil.ReadFile("./script/finalApprover.js")
	// checkConditionCEO, _ := ioutil.ReadFile("./script/checkConditionCEO.js")

	iso := v8.NewIsolate()              // create a new VM
	global := v8.NewObjectTemplate(iso) // a template that represents a JS Object
	cpuProfiler := v8.NewCPUProfiler(iso)

	apiFuncTemplate := aft.NewApiFuncTemplate(userProfileApi)
	// must set global function before create context
	apiFuncTemplate.SetupGetUserProfileByUserId(iso, global)

	ctx := v8.NewContext(iso, global)

	cpuProfiler.StartProfiling("profile-1")

	if _, err := ctx.RunScript(string(dataScript), "finalApprover.js"); err != nil {
		fmt.Printf("err %v \n", err)
	}
	// ctx.RunScript(string(checkConditionCEO), "checkConditionCEO.js") // any functions previously added to the context can be called

	ctx.RunScript(`
		const x = data;	
	`, "main.js") // any functions previously added to the context can be called

	// v8UserProfile, _ := ctx.RunScript("ceo", "value.js") // return a value in JavaScript back to Go
	v8Data, _ := ctx.RunScript("x", "value.js")

	// x, _ := json.Marshal(v8UserProfile)
	xData, _ := json.Marshal(v8Data)

	// fmt.Printf("userProfile: %+v \n", string(x))
	fmt.Printf("data: %+v \n", string(xData))

	cpuProfile := cpuProfiler.StopProfiling("profile-1")
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
