import { Actor } from "../interfaces/Statement";

function coerceActor(actor: Actor): Actor {
  const actorKeys = ["name", "mbox", "account"];
  actorKeys.forEach((actorKey) => {
    if (Array.isArray(actor[actorKey])) {
      switch (actorKey) {
        case "account": {
          actor[actorKey] = {
            ...(actor.account[0].accountServiceHomePage
              ? { homePage: actor.account[0].accountServiceHomePage }
              : null),
            ...(actor.account[0].accountName
              ? { name: actor.account[0].accountName }
              : null),
          };
          break;
        }
        default: {
          actor[actorKey] = actor[actorKey][0];
        }
      }
    }
  });
  return actor;
}

export function getSearchQueryParamsAsObject(str: string): {
  [key: string]: any;
} {
  const obj: { [key: string]: any } = {};
  const queryString = str.split("?")[1] || null;
  if (!queryString) return obj;
  const usp = new URLSearchParams(queryString);
  usp.forEach((val, key) => {
    try {
      obj[key] = JSON.parse(val);
    } catch {
      obj[key] = val;
    }
    if (key === "actor") {
      obj.actor = coerceActor(obj.actor);
    }
  });
  return obj;
}
