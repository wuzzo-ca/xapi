import { AxiosPromise } from "axios";
import { Resources } from "../../constants";
import XAPI, { Document } from "../../XAPI";
import { GetActivityProfileParams } from "./getActivityProfileParams";

export function getActivityProfile(
  this: XAPI,
  params: GetActivityProfileParams
): AxiosPromise<Document> {
  return this.requestResource(Resources.ACTIVITY_PROFILE, {
    activityId: params.activityId,
    profileId: params.profileId,
  });
}
