import {Observable} from "rxjs";
import {ajax} from "rxjs/ajax";
import {map} from "rxjs/operators";
import IEloquaCredentials from "../eloqua-credentials";
import getAuthoizationHeader from "../utils/get-authorization-header";
import IBaseUrl from "./base-url";

const {XMLHttpRequest} = require("xmlhttprequest");

const loginUrl = "https://login.eloqua.com/id";

function createXHR() {
  return new XMLHttpRequest();
}
export default class BaseUrlClient {
  public static get(
    credentials: IEloquaCredentials,
  ): Observable<IBaseUrl> {
    return ajax({
      createXHR,
      crossDomain: true,
      headers: {
        authorization: `Basic ${getAuthoizationHeader(credentials)}`,
      },
      method: "GET",
      url: loginUrl,
      withCredentials: true,
    })
    .pipe(
      map((response) => {
        return response.response as IBaseUrl;
      }),
    );
  }

  private constructor() {}
}
