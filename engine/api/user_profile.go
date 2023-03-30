package api

import (
	"engine/model"
	"engine/pkg/env"
	"engine/pkg/http"
)

type (
	UserProfileApi interface{}
	userProfileApi struct {
		http        http.HttpClient
		endpointUrl string
	}
)

func NewUserProfileApi(http http.HttpClient) UserProfileApi {
	return userProfileApi{http, env.Env().USER_PROFILE_API_ENDPOINT}
}

func (u userProfileApi) GetByUserId(userId string) (res *model.Response[model.Employee], err error) {
	url := u.endpointUrl + "/user-profile/user/" + userId

	if err := u.http.Get(url, res); err != nil {
		return nil, err
	}

	return res, nil
}
