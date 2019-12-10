import {Observable} from "rxjs";
import {ajax} from "rxjs/ajax";
import IEloquaCredentials from "../eloqua-credentials";
import getAuthoizationHeader from "../utils/get-authorization-header";
import IBaseUrl from "./base-url";

const loginUrl = "https://login.eloqua.com/id";

export default class BaseUrlClient {
  public static get(
    credentials: IEloquaCredentials,
  ): Observable<IBaseUrl> {
    return ajax.getJSON<IBaseUrl>(
      loginUrl, {
        authorization: getAuthoizationHeader(credentials),
      });
  }

  private constructor() {}
}
