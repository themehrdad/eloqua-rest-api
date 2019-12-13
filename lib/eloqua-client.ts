import IBaseUrl from "./base-urls/base-url";
import BaseUrlClient from "./base-urls/base-url-client";
import IEloquaCredentials from "./eloqua-credentials";

export default class EloquaClient {

  public static login(
    siteName: string,
    userName: string,
    password: string,
  ): Promise<EloquaClient> {
    const credentials: IEloquaCredentials = {
      password,
      siteName,
      userName,
    };
    return this.getBaseUrls(credentials)
    .then((baseUrls) => {
      return new EloquaClient(credentials, baseUrls);
    }).catch((error) => {
      throw error;
    });
  }

  private static getBaseUrls(
    credentials: IEloquaCredentials,
  ): Promise<IBaseUrl> {
    return BaseUrlClient.get(credentials);
  }

  private constructor(
    private credentials: IEloquaCredentials,
    private baseUrls: IBaseUrl,
  ) {
  }
}
