package v8

import (
	"fmt"

	v8 "rogchap.com/v8go"
)

func GetUserProfileByUserId(iso *v8.Isolate, global *v8.ObjectTemplate) {
	getUserProfileByUserId := v8.NewFunctionTemplate(iso, func(info *v8.FunctionCallbackInfo) *v8.Value {
		userId := info.Args()[0]
		fmt.Printf("userId: %v \n", userId) // when the JS function is called this Go callback will execute
		return nil                          // you can return a value back to the JS caller if required
	})
	global.Set("getUserProfileByUserId", getUserProfileByUserId) // sets the "print" property of the Object to our function
}
