import IEloquaCredentials from "../eloqua-credentials";
import getAuthorizationHeader from "./get-authorization-header";

describe("getAuthorizationHeader", () => {
  it("calculates the header as expected", () => {
    const credentials: IEloquaCredentials = {
      password: "mypassword",
      siteName: "mysite",
      userName: "myuser",
    };

    const result = getAuthorizationHeader(credentials);
    const expectedValue = "bXlzaXRlXG15dXNlcjpteXBhc3N3b3Jk"; // Calculated and verified separately.
    expect(result).toBe(expectedValue);
  });
});
