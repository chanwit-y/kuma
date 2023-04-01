package main

import (
	"engine/internal/api"
	http "engine/pkg/http"
	"fmt"
)

func main() {
	acquireToken, _ := http.NewBanpuAcquireToken(false)
	httpClient := http.NewHttpClient(acquireToken)

	userProfileApi := api.NewUserProfileApi(httpClient)

	res, _ := userProfileApi.GetByUserId("dev-52")

	fmt.Printf("user profile: %+v", res)
}
