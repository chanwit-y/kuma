import dayjs from "dayjs";
import { ClientSecretCredential } from "@azure/identity";
import { AzureToken, GetAPIRequest, StringArray } from "../@types";
import { LocalStorage } from "node-localstorage";
import axios, { AxiosInstance } from "axios";

const API_TOKEN = "API_TOKEN";

class APIService {
  private _localStorage: LocalStorage;
  private _axios: AxiosInstance;

  constructor() {
    this._localStorage = new LocalStorage("./localStorage");
    this._axios = axios.create();
    this._axios.interceptors.request.use(async (config) => {
      const azureToken = await this._getToken();
      config.headers.Authorization = `Bearer ${azureToken}`;
      config.headers["Content-Type"] = "application/json";
      return config;
    });
  }

  private async _getToken() {
    let azureToken = JSON.parse(
      this._localStorage.getItem(API_TOKEN) || ""
    ) as AzureToken;
    if (azureToken.token !== "") {
      const expiresOn = dayjs(azureToken.expiresOnTimestamp);
      if (expiresOn.diff(dayjs(), "minute") > 0) {
        return azureToken.token;
      }
    }

    const credential = new ClientSecretCredential(
      process.env.AAD_SP_TENANT_ID || "",
      process.env.AAD_SP_CLIENT_ID || "",
      process.env.AAD_SP_CLIENT_SECRET || ""
    );
    azureToken = await credential.getToken(
      process.env.AAD_SP_CLIENT_SCOPE || ""
    );
    this._localStorage.setItem(API_TOKEN, JSON.stringify(azureToken));

    return azureToken.token;
  }


  private getUrlQueryArray(query: StringArray) {
	return query.values.reduce((prev, curr) => {
		return `${prev}&${query.name}=${curr}`
	}, "")
  }

  private getUrlQueryString(params: object) {
    return Object.keys(params)
      .reduce((query, param) => {
        const value = (params as { [key: string]: any })[param];
        if (!value && value !== 0) {
          return `${query}${param}=&`;
        }
        return `${query}${param}=${(params as { [key: string]: any })[param]}&`;
      }, "")
      .slice(0, -1);
  }

  private getUrlParameter(parameter: object, url: string) {
    Object.entries(parameter).map((e) => {
      const [key, value] = e;
      url = url.replace(`:${key}`, value);
    });
    return url;
  }

  public async get(req: GetAPIRequest) {
    let url: string = "";
    const baseUrl = process.env.USER_PROFILE_URL || "";

    if (req?.parameter) {
      // url data is '/user/:userId'
      // replace :parameter to value
      url = this.getUrlParameter(req.parameter, req.url);
    }
    if (req?.stringQuery) {
      const stringQuery = this.getUrlQueryString(req.stringQuery);
      url = `${req.url}?${stringQuery}`;
    }
    if(req?.stringArray) {
	const stringArrey = this.getUrlQueryArray(req.stringArray)
	url = `${req.url}${req?.stringQuery !== undefined ? "&" : "?"}${stringArrey}`
    }
    return await this._axios.get(`${baseUrl}${url}`);
  }
}

export default new APIService();
