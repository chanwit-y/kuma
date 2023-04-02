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
	checkConditionCEOScript, _ := ioutil.ReadFile("./script/checkConditionCEO.js")

	iso := v8.NewIsolate()              // create a new VM
	global := v8.NewObjectTemplate(iso) // a template that represents a JS Object
	cpuProfiler := v8.NewCPUProfiler(iso)

	apiFuncTemplate := aft.NewApiFuncTemplate(userProfileApi)
	apiFuncTemplate.SetupGetUserProfileByUserId(iso, global)

	ctx := v8.NewContext(iso, global)

	cpuProfiler.StartProfiling("profile-1")

	if _, err := ctx.RunScript(string(dataScript), "finalApprover.js"); err != nil {
		fmt.Printf("err %v \n", err)
	}
	if _, err := ctx.RunScript(string(checkConditionCEOScript), "checkConditionCEO.js"); err != nil {
		fmt.Printf("err %v \n", err)
	}

	ctx.RunScript(`
		const ceo = checkConditionCEO(data.requester)
	`, "main.js") // any functions previously added to the context can be called

	v8CEO, _ := ctx.RunScript("ceo", "value.js")

	result, _ := json.Marshal(v8CEO)

	fmt.Printf("ceo: %+v \n", string(result))

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
