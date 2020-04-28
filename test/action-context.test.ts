import { resolve } from "path";

import { Octokit as Core } from "@octokit/core";
import { createActionAuth } from "@octokit/auth-action";
import { actionContext } from "../src";

const Octokit = Core.plugin(actionContext).defaults({
  authStrategy: createActionAuth,
});

describe("context", () => {
  beforeAll(() => {
    process.env.GITHUB_ACTION = "123";
    process.env.GITHUB_TOKEN = "token123";
    process.env.GITHUB_EVENT_PATH = resolve(
      __dirname,
      "fixtures",
      "push-event-payload.json"
    );
  });

  it("octokit.context.payload", () => {
    const octokit = new Octokit();
    expect(octokit.context).toHaveProperty("payload");
    expect(octokit.context.payload.repository.owner.login).toEqual(
      "Codertocat"
    );
  });
});
