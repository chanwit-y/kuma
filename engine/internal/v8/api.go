package v8

import (
	"encoding/json"
	"engine/internal/api"
	"fmt"

	v8 "rogchap.com/v8go"
)

type (
	ApiFuncTemplate interface {
		SetupGetUserProfileByUserId(iso *v8.Isolate, global *v8.ObjectTemplate)
	}
	apiFuncTemplate struct {
		userProfileApi api.UserProfileApi
	}
)

func NewApiFuncTemplate(userProfileApi api.UserProfileApi) ApiFuncTemplate {
	return apiFuncTemplate{userProfileApi}
}

func (a apiFuncTemplate) SetupGetUserProfileByUserId(iso *v8.Isolate, global *v8.ObjectTemplate) {
	getUserProfileByUserId := v8.NewFunctionTemplate(iso, func(info *v8.FunctionCallbackInfo) *v8.Value {
		userId := info.Args()[0]

		res, _ := a.userProfileApi.GetByUserId(userId.String())

		jsonBytes, _ := json.Marshal(res)

		ctx := v8.NewContext(iso, global)
		val, _ := v8.JSONParse(ctx, string(jsonBytes))

		fmt.Printf("val: %+v \n", val)
		return val
	})
	global.Set("getUserProfileByUserId", getUserProfileByUserId)
}
