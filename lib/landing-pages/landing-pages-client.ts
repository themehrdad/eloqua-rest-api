import {IListRequestOptions, IListResponse} from "../rest-api-interfaces";
import {RestClient} from "../rest-client";
import { ILandingPage } from "./landing-page-interfaces";

const getListPath = "/api/REST/1.0/assets/landingPages";

export class LandingPageClient {
  constructor(private client: RestClient) { }

  public getLandingPages(
    options: IListRequestOptions): Promise<IListResponse<ILandingPage>> {
      return this.client.getList(getListPath, options);
  }
}
