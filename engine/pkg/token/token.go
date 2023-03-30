package token

import (
	"context"
	"engine/pkg/env"

	msal "github.com/AzureAD/microsoft-authentication-library-for-go/apps/confidential"
)

type Token struct {
	client msal.Client
}

var ctx = context.Background()

func NewToken() (*Token, error) {
	cred, err := msal.NewCredFromSecret(env.Env().AAD_SP_CLIENT_SECRET)
	if err != nil {
		return nil, err
	}
	client, err := msal.New(env.Env().AAD_SP_CLIENT_ID, cred, msal.WithAuthority(env.Env().AAD_SP_AUTHORITY))
	if err != nil {
		return nil, err
	}

	return &Token{client}, nil
}

func GetScope(isGraph bool) []string {
	scopes := []string{}
	if isGraph && env.Env().AAD_SP_CLIENT_GRAPH_SCOPE != "" {
		scopes = append(scopes, env.Env().AAD_SP_CLIENT_GRAPH_SCOPE)
	} else if env.Env().AAD_SP_CLIENT_SCOPE != "" {
		scopes = append(scopes, env.Env().AAD_SP_CLIENT_SCOPE)
	}

	return scopes
}

func (c Token) GetTokenByCredential(isGraph bool) (*msal.AuthResult, error) {
	// authResult, err := c.client.AcquireTokenByCredential(ctx, []string{env.Env().AAD_SP_CLIENT_SCOPE, env.Env().AAD_SP_CLIENT_GRAPH_SCOPE})
	authResult, err := c.client.AcquireTokenByCredential(ctx, GetScope(isGraph))
	if err != nil {
		return nil, err
	}

	return &authResult, nil
}

func (c Token) GetTokenSilent(isGraph bool) (*msal.AuthResult, error) {
	authResult, err := c.client.AcquireTokenSilent(ctx, GetScope(isGraph))
	if err != nil {
		return nil, err
	}

	return &authResult, nil
}
