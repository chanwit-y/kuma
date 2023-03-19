import dayjs from "dayjs";
import { ClientSecretCredential } from "@azure/identity";
import { AzureToken } from "../@types";
import { LocalStorage } from "node-localstorage";
import axios, {  AxiosInstance } from "axios";

const API_TOKEN = "API_TOKEN";

export class APIService {
  private _localStorage: LocalStorage;
  private _axios: AxiosInstance;

  constructor() {
    this._localStorage = new LocalStorage("./localStorage");
    this._axios = axios.create();
    this._axios.interceptors.request.use(async (config) => {
      const azureToken = await this._getToken();
      config.headers.Authorization = `Bearer ${azureToken}`;
      config.headers["Content-Type"] = "application/json"
      return config;
    });
  }

  private async _getToken() {
    let azureToken = JSON.parse(
      this._localStorage.getItem(API_TOKEN) || ""
    ) as AzureToken;
    if (azureToken.token !== "") {
      const expiresOn = dayjs(azureToken.expiresOnTimestamp);
      if (expiresOn.diff(dayjs(), "minute") !== 0) {
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

  public async get(url: string) {
    const baseUrl = process.env.USER_PROFILE_URL;
    return await this._axios.get(`${baseUrl}${url}`);
  }
}

// export default new APIService();
