package http

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"time"
)

type (
	HttpClient struct {
		Client       *http.Client
		Header       http.Header
		Token        string
		ExpiresOn    time.Time
		AcquireToken AcquireToken
	}

	AcquireToken interface {
		AcquireTokenByCredential() (string, time.Time, error)
		AcquireTokenSilent() (string, time.Time, error)
	}

	Response struct {
		Data []byte
		Err  error
	}
)

func NewHttpClient(acquire AcquireToken) HttpClient {
	token, expiresOn, err := acquire.AcquireTokenByCredential()
	if err != nil {
		panic(err)
	}
	header := http.Header{
		"Content-Type":  []string{"application/json"},
		"Accept":        []string{"application/json"},
		"Authorization": []string{fmt.Sprintf("Bearer %v", token)},
	}

	return HttpClient{&http.Client{},
		header,
		token,
		expiresOn,
		acquire}
}

func RefreshToken(h *HttpClient) {
	if !h.ExpiresOn.IsZero() {
		if h.ExpiresOn.Before(time.Now().Local()) {
			// fmt.Println("Refresh token")
			token, expiresOn, err := h.AcquireToken.AcquireTokenSilent()
			// fmt.Printf("new token %v \n", token)
			// fmt.Printf("new expiresOn %v \n", expiresOn)
			if err != nil {
				token, expiresOn, _ = h.AcquireToken.AcquireTokenByCredential()
			}
			h.Token = token
			h.ExpiresOn = expiresOn
			h.Header.Set("Authorization", fmt.Sprintf("Bearer %v", token))
		}
	}
}

func (h HttpClient) GetBytes(endpoint string) ([]byte, error) {
	var response Response
	result := make(chan Response)
	go SendRequest(h, endpoint, http.MethodGet, nil, result)
	response = <-result

	return response.Data, response.Err
}

func (h HttpClient) Get(endpoint string, data any) error {
	var response Response
	result := make(chan Response)
	go SendRequest(h, endpoint, http.MethodGet, nil, result)
	response = <-result

	if response.Err != nil {
		return response.Err
	}

	// HandleErrorAndUnmarshal(response.Data, &data)
	if err := HandleErrorAndUnmarshal(response.Data, &data); err != nil {
		return err
	}

	return nil
}

func (h HttpClient) PostBytes(endpoint string, body io.Reader) ([]byte, error) {
	var response Response
	result := make(chan Response)
	go SendRequest(h, endpoint, http.MethodPost, body, result)
	response = <-result

	return response.Data, response.Err
}

func (h HttpClient) Post(endpoint string, body io.Reader, data any) error {
	var response Response
	result := make(chan Response)
	go SendRequest(h, endpoint, http.MethodPost, body, result)
	response = <-result

	if response.Err != nil {
		return response.Err
	}

	if err := HandleErrorAndUnmarshal(response.Data, &data); err != nil {
		return err
	}

	return nil
}

func (h HttpClient) PostForm(endpoint string, values url.Values, data any) error {
	encodedData := values.Encode()
	h.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	var response Response
	result := make(chan Response)
	go SendRequest(h, endpoint, http.MethodPost, strings.NewReader(encodedData), result)
	response = <-result

	if response.Err != nil {
		return response.Err
	}

	if err := HandleErrorAndUnmarshal(response.Data, &data); err != nil {
		return err
	}

	return nil
}

func (h HttpClient) Put(endpoint string, body io.Reader, data any) error {
	var response Response
	result := make(chan Response)
	go SendRequest(h, endpoint, http.MethodPut, body, result)
	response = <-result

	if response.Err != nil {
		return response.Err
	}

	var x any
	json.Unmarshal(response.Data, x)

	if err := HandleErrorAndUnmarshal(response.Data, &data); err != nil {
		return err
	}

	return nil
}

func (h HttpClient) PutBytes(endpoint string, body io.Reader) ([]byte, error) {
	var response Response
	result := make(chan Response)
	go SendRequest(h, endpoint, http.MethodPut, body, result)
	response = <-result

	return response.Data, response.Err
}

func (h HttpClient) Patch(endpoint string, body io.Reader, data any) error {
	var response Response
	result := make(chan Response)
	go SendRequest(h, endpoint, http.MethodPatch, body, result)
	response = <-result

	if response.Err != nil {
		return response.Err
	}

	if err := HandleErrorAndUnmarshal(response.Data, &data); err != nil {
		return err
	}

	return nil
}

func (h HttpClient) PatchBytes(endpoint string, body io.Reader) ([]byte, error) {
	var response Response
	result := make(chan Response)
	go SendRequest(h, endpoint, http.MethodPatch, body, result)
	response = <-result

	return response.Data, response.Err
}

func (h HttpClient) Delete(endpoint string, body io.Reader, data any) error {
	var response Response
	result := make(chan Response)
	go SendRequest(h, endpoint, http.MethodDelete, body, result)
	response = <-result

	if response.Err != nil {
		return response.Err
	}

	if err := HandleErrorAndUnmarshal(response.Data, &data); err != nil {
		return err
	}

	return nil
}

func (h HttpClient) DeleteBytes(endpoint string, body io.Reader) ([]byte, error) {
	var response Response
	result := make(chan Response)
	go SendRequest(h, endpoint, http.MethodDelete, body, result)
	response = <-result

	return response.Data, response.Err
}

func getRequest(h HttpClient, url string, method string, body io.Reader) ([]byte, error) {
	req, err := http.NewRequest(method, url, body)
	if err != nil {
		return nil, err
	}
	req.Header = h.Header

	res, err := h.Client.Do(req)
	if err != nil {
		return nil, err
	}

	defer res.Body.Close()

	return io.ReadAll(res.Body)
}

func SendRequest(http HttpClient, url, method string, body io.Reader, result chan Response) {
	RefreshToken(&http)
	// fmt.Printf("url: %v \n", url)

	res, err := getRequest(http, url, method, body)
	// fmt.Printf("res byte: %v \n", res)

	var reqLog any
	json.Unmarshal(res, &reqLog)
	// fmt.Printf("SendRequest: %+v \n", reqLog)

	if err != nil {
		result <- Response{Data: nil, Err: err}
	}
	result <- Response{Data: res, Err: nil}

}

func HandleErrorAndUnmarshal(body []byte, result any) error {
	err := json.Unmarshal(body, &result)
	if err != nil {
		return err
	}

	return nil
}
