import EloquaClient from "../eloqua-client";
import {IListRequestOptions, IListResponse} from "../rest-api-interfaces";
import { ILandingPage } from "./landing-page-interfaces";

const path = "/api/REST/1.0/assets/landingPages";

export default function getLandingPages(
  client: EloquaClient,
  options: IListRequestOptions): Promise<IListResponse<ILandingPage>> {
    
}
