# puppeteer-screenshot

Node.js app for taking screenshots of web pages using Puppeteer.
Build to run as a serverless function on vercel.

## Features

- Take a screenshot of any website with configurable viewport width, height and device scale
- Image compression of jpeg or png image with configurable quality
- Option to take a fullscreen screenshot
- Protected by a secret key, to protect the public app

## Usage

Set a Vercel secret called `SECRET_KEY` with a random string in it, then deploy.

You can access screenshots for pages using:

    https://<app-url>/google.com?key=<SECRET_KEY>

## Querystring arguments

With the following query string parameters you can configure the behaviour of the service.

- `?viewportWidth=` sets the browser viewport width in pixels. Default: 1200
- `?viewportHeight=` sets the browser viewport height in pixels. Default: 700
- `?deviceScaleFactor=` sets the device scaling factor. Default: 1.0
- `?type=` set the output type to `png` or `jpeg`. Default is `png`.
- `?fullPage=[true|false]` fetch a screenshot of the full page, not just the browser viewport.

### Image Quality for JPEG

With `type=jpeg` you can control the quality resolution of the image with the following option:

- `?quality=[0..100]` set the JPEG output quality. Ignored for PNG.

### Image Quality for PNG

With `type=png` you can control the quality resolution of the image with the following options:

- `?minQuality=[0.0 ... 1.0]` set the PNG output quality. Ignored for JPEG.
- `?maxQuality=[0.0 ... 1.0]` set the PNG output quality. Ignored for JPEG.

### Environment variables

The query strings can also be set as environment variables in `.env` with the same names as the query strings.

## Development

This project is build to run as a servless function on vercel.
But it is also possible to run it on a local machine with the command `vercel dev`.
In this mode the dev depdency to the full puppeteer is used instead of `chrome-aws-lambda`.

## Acknlowledgements

- Fork from [@simonw](https://github.com/simonw) from [puppeteer-screenshot](https://github.com/simonw/puppeteer-screenshot)
- Initial code by [@styfle](https://github.com/styfle) in [this pull request](https://github.com/vercel/now-examples/pull/207).
