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
    process.env.GITHUB_EVENT_NAME = "push";
    process.env.GITHUB_SHA = "0000000000000000000000000000000000000001";
    process.env.GITHUB_REF = "refs/tags/simple-tag";
  });

  it("octokit.context.payload", () => {
    const octokit = new Octokit();
    expect(octokit.context).toHaveProperty("payload");
    expect(octokit.context.payload.repository.owner.login).toEqual(
      "Codertocat"
    );
  });

  it("octokit.context.eventName", () => {
    const octokit = new Octokit();
    expect(octokit.context).toHaveProperty("eventName");
    expect(octokit.context.eventName).toEqual("push");
  });

  it("octokit.context.sha", () => {
    const octokit = new Octokit();
    expect(octokit.context).toHaveProperty("sha");
    expect(octokit.context.sha).toEqual(
      "0000000000000000000000000000000000000001"
    );
  });

  it("octokit.context.ref", () => {
    const octokit = new Octokit();
    expect(octokit.context).toHaveProperty("ref");
    expect(octokit.context.ref).toEqual("refs/tags/simple-tag");
  });
});
