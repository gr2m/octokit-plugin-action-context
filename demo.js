const { Octokit: Core } = require("@octokit/core");
const { createActionAuth } = require("@octokit/auth-action");
const { actionContext } = require("./pkg");

const Octokit = Core.plugin(actionContext).defaults({
  authStrategy: createActionAuth,
});

const octokit = new Octokit();

console.log(octokit.context);
