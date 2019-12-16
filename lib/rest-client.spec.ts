import Axios, { AxiosResponse } from "axios";
import "jest";
import "jest-extended";
import IBaseUrl from "./base-urls/base-url";
import IEloquaCredentials from "./eloqua-credentials";
import RestClient from "./rest-client";

describe("RestClient", () => {
  let axiosGetMock: jest.Mock;
  const credentials: IEloquaCredentials = { password: "pass", siteName: "site", userName: "user" };
  const baseUrl: IBaseUrl = {
    site: {} as any,
    urls: {
      apis: {
        rest: {
          bulk: "",
          standard: "/base-standard-url",
        },
        soap: {} as any,
      },
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

    it("uses the correct endpoint path", () => {
      const client = new RestClient(credentials, baseUrl);
      client.getList("/api/resource");
      expect(axiosGetMock)
        .toHaveBeenCalledWith(
          "http://test/base-standard-url/api/resource",
          expect.anything());
    });
  });
});
