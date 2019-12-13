import Axios from "axios";
import "jest";
import "jest-extended";

describe("RestClient", () => {
  let axiosGetMock: jest.Mock;

  beforeEach(() => {
    axiosGetMock = jest.fn();
    Axios.get = axiosGetMock;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("getList", () => {
    
  });
});
