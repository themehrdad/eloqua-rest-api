import Axios, { AxiosResponse } from "axios";
import "jest";
import "jest-extended";
import {IBaseUrl} from "./base-urls/base-url-interfaces";
import {IEloquaCredentials} from "./eloqua-credentials";
import { IListRequestOptions } from "./rest-api-interfaces";
import {RestClient} from "./rest-client";

describe("RestClient", () => {
  let axiosGetMock: jest.Mock;
  const credentials: IEloquaCredentials = { password: "pass", siteName: "site", userName: "user" };
  const baseUrl: IBaseUrl = {
    site: {} as any,
    urls: {
      apis: {} as any,
      base: "http://test",
    },
    user: {} as any,
  };

  beforeEach(() => {
    axiosGetMock = jest.fn();
    Axios.get = axiosGetMock;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("getList", () => {
    beforeEach(() => {
      const response: AxiosResponse = {
        config: {},
        data: [],
        headers: {},
        status: 200,
        statusText: "OK",
      };

      axiosGetMock.mockResolvedValue(response);
    });

    it("calculates endpoint path correctly", () => {
      const client = new RestClient(credentials, baseUrl);
      client.getList("/api/resource");
      expect(axiosGetMock)
        .toHaveBeenCalledWith(
          "http://test/api/resource",
          expect.anything());
    });

    it("passes the credentials", () => {
      const client = new RestClient(credentials, baseUrl);
      client.getList("/api/resource");
      const expectedCredentials = {
        auth: {
          password: credentials.password,
          username: `${credentials.siteName}\\${credentials.userName}`,
        },
      };
      expect(axiosGetMock)
        .toHaveBeenCalledWith(
          expect.anything(),
          expectedCredentials,
          );
    });

    it("other parameters", () => {
      const client = new RestClient(credentials, baseUrl);
      const params: IListRequestOptions = {
        count: 10,
        depth: "complete",
        lastUpdatedAt: 1,
        orderBy: "id",
        page: 3,
        search: "name='test'",
      };
      client.getList("/api/resource", params);
      expect(axiosGetMock)
        .toHaveBeenCalledWith(
          expect.anything(),
          expect.objectContaining({ params }),
          );
    });
  });
});
