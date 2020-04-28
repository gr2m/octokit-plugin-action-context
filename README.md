# octokit-plugin-action-context

> Adds `octokit.context` object with all things relevant when run in a GitHub Action context

[![@latest](https://img.shields.io/npm/v/octokit-plugin-action-context.svg)](https://www.npmjs.com/package/octokit-plugin-action-context)
[![Build Status](https://github.com/gr2m/octokit-plugin-action-context/workflows/Test/badge.svg)](https://github.com/gr2m/octokit-plugin-action-context/actions?workflow=Test)
[![Greenkeeper](https://badges.greenkeeper.io/gr2m/octokit-plugin-action-context.svg)](https://greenkeeper.io/)

## Usage

<table>
<tbody valign=top align=left>
<tr><th>

Browsers

</th><td width=100%>

`octokit-plugin-action-context` is not meant for browser usage.

</td></tr>
<tr><th>

Node

</th><td>

Install with `npm install @octokit/core octokit-plugin-action-context`. Optionally replace `@octokit/core` with a core-compatible module

```js
const { Octokit } = require("@octokit/core");
const { actionContext } = require("octokit-plugin-action-context");
```

</td></tr>
</tbody>
</table>

```js
const OctokitWithContext = Octokit.plugin(actionContext);
const octokit = new OctokitWithContext({
  auth: process.env.GITHUB_TOKEN,
});

const {
  payload,
  eventName,
  sha,
  ref,
  workflow,
  action,
  actor,
  repo,
  issue,
} = octokit.context;
```

See [the output](https://github.com/gr2m/octokit-plugin-action-context/actions?query=workflow%3ADemo) of this repository's [demo workflow](https://github.com/gr2m/octokit-plugin-action-context/blob/master/.github/workflows/demo.yml)'s for a live example.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](LICENSE)
