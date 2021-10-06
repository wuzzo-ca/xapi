import { AxiosPromise } from "axios";
import { Resources } from "../../constants";
import XAPI, { GetAgentProfilesParams } from "../../XAPI";

export function getAgentProfiles(
  this: XAPI,
  params: GetAgentProfilesParams
): AxiosPromise<string[]> {
  return this.requestResource(Resources.AGENT_PROFILE, {
    agent: params.agent,
    ...(params.since
      ? {
          since: params.since,
        }
      : {}),
  });
}
