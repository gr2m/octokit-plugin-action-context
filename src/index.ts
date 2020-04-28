import { VERSION } from "./version";

/**
 * @param octokit Octokit instance
 * @param options Options passed to Octokit constructor
 */
export function actionContext() {
  const payload = require(process.env.GITHUB_EVENT_PATH as string);
  const [owner, repo] = (process.env.GITHUB_REPOSITORY as string).split("/");
  const number = (payload.issue || payload.pull_request || payload).number;

  return {
    context: {
      payload: require(process.env.GITHUB_EVENT_PATH as string),
      eventName: process.env.GITHUB_EVENT_NAME,
      sha: process.env.GITHUB_SHA,
      ref: process.env.GITHUB_REF,
      workflow: process.env.GITHUB_WORKFLOW,
      action: process.env.GITHUB_ACTION,
      actor: process.env.GITHUB_ACTOR,
      repo: {
        owner,
        repo,
      },
      issue: {
        owner,
        repo,
        number,
      },
    },
  };
}
actionContext.VERSION = VERSION;
