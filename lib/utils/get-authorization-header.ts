import {Buffer} from "buffer";
import IEloquaCredentials from "../eloqua-credentials";

export default function getAuthoizationHeader(credentials: IEloquaCredentials): string {
  const authValue = `${credentials.siteName}\\${credentials.userName}:${credentials.password}`;
  return Buffer.from(authValue).toString("base64");
}
