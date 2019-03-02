# React.lazy() and Dynamic Chunking with Webpack

Simple demo for using `React.lazy()` and `webpack` for dynamic chunking that will be part of a presentation I give.

We'll take the basic components and such from this repo and leverage `React.lazy()` to generate new dynamic chunks.

## Getting Started

1. `git clone` this repo
1. `cd` into your newly cloned repo
1. Run `yarn`
1. Generate your own `.env` by running `touch project.local.env`
1. Get an API Key for the [Giphy API](https://developers.giphy.com/)
1. Set the `GIPHY_API_KEY` environment variable in your `project.local.env` file
1. Run `yarn start`

**NOTE**: The IEX Trading API that we are using in this demo will be decommissioned
**2019-06-01**, so parts of this demo will stop working after that date.
