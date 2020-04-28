import { VERSION } from "./version";

type Octokit = any;
type Options = {
  [option: string]: any;
};

/**
 * @param octokit Octokit instance
 * @param options Options passed to Octokit constructor
 */
export function actionContext(octokit: Octokit, options: Options) {
  return {
    context: {
      payload: require(process.env.GITHUB_EVENT_PATH as string),
      eventName: process.env.GITHUB_EVENT_NAME,
      sha: process.env.GITHUB_SHA,
      ref: process.env.GITHUB_REF,
      workflow: process.env.GITHUB_WORKFLOW,
      action: process.env.GITHUB_ACTION,
      actor: process.env.GITHUB_ACTOR,
    },
  };
}
actionContext.VERSION = VERSION;
