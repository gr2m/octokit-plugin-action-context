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
    process.env.GITHUB_WORKFLOW = "Test";
    process.env.GITHUB_ACTOR = "codertocat";
    process.env.GITHUB_REPOSITORY = "Codertocat/Hello-World";
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

  it("octokit.context.workflow", () => {
    const octokit = new Octokit();
    expect(octokit.context).toHaveProperty("workflow");
    expect(octokit.context.workflow).toEqual("Test");
  });

  it("octokit.context.action", () => {
    const octokit = new Octokit();
    expect(octokit.context).toHaveProperty("action");
    expect(octokit.context.action).toEqual("123");
  });

  it("octokit.context.actor", () => {
    const octokit = new Octokit();
    expect(octokit.context).toHaveProperty("actor");
    expect(octokit.context.actor).toEqual("codertocat");
  });

  it("octokit.context.repo", () => {
    const octokit = new Octokit();
    expect(octokit.context).toHaveProperty("repo");
    expect(octokit.context.repo).toStrictEqual({
      owner: "Codertocat",
      repo: "Hello-World",
    });
  });

  it("octokit.context.issue for 'push' event", () => {
    const octokit = new Octokit();
    expect(octokit.context).toHaveProperty("repo");
    expect(octokit.context.issue).toStrictEqual({
      owner: "Codertocat",
      repo: "Hello-World",
      number: undefined,
    });
  });

  it("octokit.context.issue for 'issues' event", () => {
    process.env.GITHUB_EVENT_PATH = resolve(
      __dirname,
      "fixtures",
      "issues-event-payload.json"
    );

    const octokit = new Octokit();
    expect(octokit.context).toHaveProperty("repo");
    expect(octokit.context.issue).toStrictEqual({
      owner: "Codertocat",
      repo: "Hello-World",
      number: 1,
    });
  });

  it("octokit.context.issue for 'pull_request' event", () => {
    process.env.GITHUB_EVENT_PATH = resolve(
      __dirname,
      "fixtures",
      "pull-request-event-payload.json"
    );

    const octokit = new Octokit();
    expect(octokit.context).toHaveProperty("repo");
    expect(octokit.context.issue).toStrictEqual({
      owner: "Codertocat",
      repo: "Hello-World",
      number: 2,
    });
  });

  it("octokit.context.issue for 'issue_comment' event", () => {
    process.env.GITHUB_EVENT_PATH = resolve(
      __dirname,
      "fixtures",
      "issue-comment-event-payload.json"
    );

    const octokit = new Octokit();
    expect(octokit.context).toHaveProperty("repo");
    expect(octokit.context.issue).toStrictEqual({
      owner: "Codertocat",
      repo: "Hello-World",
      number: 1,
    });
  });

  it("octokit.context.issue for 'pull_request_review' event", () => {
    process.env.GITHUB_EVENT_PATH = resolve(
      __dirname,
      "fixtures",
      "pull-request-review-event-payload.json"
    );

    const octokit = new Octokit();
    expect(octokit.context).toHaveProperty("repo");
    expect(octokit.context.issue).toStrictEqual({
      owner: "Codertocat",
      repo: "Hello-World",
      number: 2,
    });
  });
});
