import { Depth } from "../rest-api-interfaces";
import { IContentSection } from "../shared/content-section-interface";
import { IHyperlink } from "../shared/hyperlink-interface";

export interface ILandingPage {
  id: number;
  accessedAt?: string;
  autoCloseWaitFor?: string;
  autoRedirectWaitFor?: string;
  contentSections?: IContentSection[];
}
