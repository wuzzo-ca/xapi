import { AxiosPromise } from "axios";
import { Resources } from "../constants";
import XAPI, { Agent, Timestamp } from "../XAPI";

export function createAgentProfile(
  this: XAPI,
  agent: Agent,
  profileId: string,
  profile: { [key: string]: any },
  etag?: string,
  matchHeader?: "If-Match" | "If-None-Match"
): AxiosPromise<void> {
  const headers = {};
  if (etag) headers[matchHeader] = etag;
  return this.requestResource(
    Resources.AGENT_PROFILE,
    {
      agent: agent,
      profileId: profileId,
    },
    {
      method: "POST",
      data: profile,
      headers: headers,
    }
  );
}

export function setAgentProfile(
  this: XAPI,
  agent: Agent,
  profileId: string,
  profile: { [key: string]: any },
  etag: string,
  matchHeader: "If-Match" | "If-None-Match"
): AxiosPromise<void> {
  const headers = {};
  headers[matchHeader] = etag;
  return this.requestResource(
    Resources.AGENT_PROFILE,
    {
      agent: agent,
      profileId: profileId,
    },
    {
      method: "PUT",
      data: profile,
      headers: headers,
    }
  );
}

export function getAgentProfiles(
  this: XAPI,
  agent: Agent,
  since?: Timestamp
): AxiosPromise<string[]> {
  return this.requestResource(Resources.AGENT_PROFILE, {
    agent: agent,
    ...(since
      ? {
          since,
        }
      : {}),
  });
}

export function getAgentProfile(
  this: XAPI,
  agent: Agent,
  profileId: string
): AxiosPromise<{ [key: string]: any }> {
  return this.requestResource(Resources.AGENT_PROFILE, {
    agent: agent,
    profileId: profileId,
  });
}

export function deleteAgentProfile(
  this: XAPI,
  agent: Agent,
  profileId: string,
  etag?: string
): AxiosPromise<void> {
  const headers = {};
  if (etag) headers["If-Match"] = etag;
  return this.requestResource(
    Resources.AGENT_PROFILE,
    {
      agent: agent,
      profileId: profileId,
    },
    {
      method: "DELETE",
      headers: headers,
    }
  );
}
