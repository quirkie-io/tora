<img alt="tora banner" src="https://github.com/quirkie-io/tora/raw/main/.github/banner.png"/>

<div align="center">
    <img src="https://badgen.net/npm/v/tora?" alt="NPM Version" />
    <img src="https://github.com/quirkie-io/tora/workflows/CI/badge.svg" alt="Build Status" />
</a>
</div>
<br />

<div align="center"><strong>Small & async terminal spinner based on yocto-spinner</strong></div>
<div align="center">Run your spinner even when the main thread is blocked.</div>

<br />

## Install

#### With npm

```sh
npm i tora-spinner
```

#### With yarn

```sh
yarn add tora-spinner
```

## Usage

```js
import tora from "tora-spinner";

const spinner = tora({ text: "Loading…" }).start();

setTimeout(() => {
  spinner.success("Success!");
}, 2000);
```

## API

### tora(options?)

Creates a new spinner instance.

#### options

Type: `object`

##### text

Type: `string`\
Default: `''`

The text to display next to the spinner.

##### spinner

Type: `object`\
Default: <img src="https://github.com/sindresorhus/ora/blob/main/screenshot-spinner.gif?raw=true" width="14">

Customize the spinner animation with a custom set of frames and interval.

```js
{
	frames: ['-', '\\', '|', '/'],
	interval: 100,
}
```

Pass in any spinner from [`cli-spinners`](https://github.com/sindresorhus/cli-spinners).

##### color

Type: `string`\
Default: `'cyan'`\
Values: `'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray'`

The color of the spinner.

##### stream

Type: `stream.Writable`\
Default: `process.stderr`

The stream to which the spinner is written.

### Instance methods

#### .start(text?)

Starts the spinner.

Returns the instance.

Optionally, updates the text:

```js
spinner.start("Loading…");
```

#### .stop(finalText?)

Stops the spinner.

Returns the instance.

Optionally displays a final message.

```js
spinner.stop("Stopped.");
```

#### .success(text?)

Stops the spinner and displays a success symbol with the message.

Returns the instance.

```js
spinner.success("Success!");
```

#### .error(text?)

Stops the spinner and displays an error symbol with the message.

Returns the instance.

```js
spinner.error("Error!");
```

#### .warning(text?)

Stops the spinner and displays a warning symbol with the message.

Returns the instance.

```js
spinner.warning("Warning!");
```

#### .clear()

Clears the spinner.

Returns the instance.

#### .info(text?)

Stops the spinner and displays an info symbol with the message.

Returns the instance.

```js
spinner.info("Info.");
```

#### .text <sup>get/set</sup>

Change the text displayed next to the spinner.

```js
spinner.text = "New text";
```

#### .color <sup>get/set</sup>

Change the spinner color.

#### .isSpinning <sup>get</sup>

Returns whether the spinner is currently spinning.

## Credits

- [ora](https://github.com/sindresorhus/ora) - terminal spinner
- [yocto-spinner](https://github.com/sindresorhus/yocto-spinner) - terminal spinner
