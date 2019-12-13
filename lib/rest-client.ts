import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import IBaseUrl from "./base-urls/base-url";
import IEloquaCredentials from "./eloqua-credentials";
import { IListRequestOptions, IListResponse } from "./rest-api-interfaces";

export default class RestClient {
  constructor(
    private credentials: IEloquaCredentials,
    private baseUrls: IBaseUrl,
  ) {
  }

  public getList<T>(
    endpointPath: string,
    options: IListRequestOptions,
  ): Promise<IListResponse<T>> {
    return Axios.get(
      this.makeAbsoluteUrl(endpointPath),
      this.getRestConfig(options),
    ).then((response) => {
      return this.readResponse<IListResponse<T>>(response);
    }).catch((error) => {
      throw error;
    });
  }

  private getRestConfig(options: {[key: string]: any}): AxiosRequestConfig {
    return {
      auth: {
        password: this.credentials.password,
        username: `${this.credentials.siteName}\\${this.credentials.userName}`,
      },
      params: options,
    };
  }

  private makeAbsoluteUrl(apiPath: string) {
    return `${this.baseUrls.urls.apis.rest.standard}${apiPath}`;
  }

  private readResponse<T>(response: AxiosResponse) {
    if (response.status === 200 && typeof response.data !== "undefined") {
      return response.data as T;
    } else {
      throw new Error(response.statusText);
    }
  }
}
