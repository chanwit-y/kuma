package http

import (
	"time"

	token "engine/pkg/token"
)

type (
	banpuAcquireToken struct {
		token   *token.Token
		isGraph bool
	}
)

func NewBanpuAcquireToken(isGraph bool) (*banpuAcquireToken, error) {
	token, err := token.NewToken()
	if err != nil {
		return nil, err
	}
	return &banpuAcquireToken{token, isGraph}, nil
}

func (a banpuAcquireToken) AcquireTokenByCredential() (string, time.Time, error) {
	authResult, err := a.token.GetTokenByCredential(a.isGraph)
	if err != nil {
		return "", time.Time{}, err
	}

	return authResult.AccessToken, authResult.ExpiresOn, nil
}

func (a banpuAcquireToken) AcquireTokenSilent() (string, time.Time, error) {
	authResult, err := a.token.GetTokenSilent(a.isGraph)
	if err != nil {
		return "", time.Time{}, err
	}

	return authResult.AccessToken, authResult.ExpiresOn, nil
}
