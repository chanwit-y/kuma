package main

import (
	"encoding/json"
	"engine/internal/api"
	http "engine/pkg/http"
	"fmt"

	aft "engine/internal/v8"

	v8 "rogchap.com/v8go"
)

func main() {
	acquireToken, _ := http.NewBanpuAcquireToken(false)
	httpClient := http.NewHttpClient(acquireToken)
	userProfileApi := api.NewUserProfileApi(httpClient)

	iso := v8.NewIsolate()              // create a new VM
	global := v8.NewObjectTemplate(iso) // a template that represents a JS Object
	cpuProfiler := v8.NewCPUProfiler(iso)

	apiFuncTemplate := aft.NewApiFuncTemplate(userProfileApi)
	// must set global function before create context
	apiFuncTemplate.SetupGetUserProfileByUserId(iso, global)

	ctx := v8.NewContext(iso, global)

	cpuProfiler.StartProfiling("profile-1")

	ctx.RunScript(`
		const userProfile = getUserProfileByUserId('dev-52');
	`, "main.js") // any functions previously added to the context can be called

	v8UserProfile, _ := ctx.RunScript("userProfile", "value.js") // return a value in JavaScript back to Go
	x, _ := json.Marshal(v8UserProfile)

	fmt.Printf("userProfile: %+v \n", string(x))

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
