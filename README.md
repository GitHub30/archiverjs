## Summary

ArchiverJS is a lightweight Node.js library for compressing and extracting directories with support for `.tar.gz`, `.zip`, and `.7z` formats, powered by a promise-based API for seamless async/await usage ([docs.npmjs.com][1]). It aims to simplify archive workflows in Node.js projects by providing a single, intuitive interface for multiple archive types ([Bits and Pieces][2]).

## Installation

Install ArchiverJS via npm:

```bash
npm install archiverjs --save
```

This adds ArchiverJS to your project’s dependencies ([docs.npmjs.com][1]).

## Usage

Import and use the `compress` and `extract` functions with async/await:

```js
import { compress, extract } from 'archiverjs';

await compress('mydir'); // create mydir.tar.gz
await compress('mydir', 'mydir.tar.gz');
await compress('mydir', 'mydir.zip');
await compress('mydir', 'mydir.7z');

await extract('mydir.tar.gz');
await extract('mydir.zip');
await extract('mydir.7z');
```

This pattern follows typical Node.js module usage guidelines for clarity and consistency ([Bits and Pieces][2]).

## Features

* **Promise-based API** for easy async/await integration ([Bits and Pieces][2])
* **Multi-format support**: `.tar.gz`, `.zip`, and `.7z` ([Bits and Pieces][2])
* **No external CLI dependencies**: all operations run via native Node.js packages ([Bits and Pieces][2])

## API

### `compress(inputDir, outputPath)`

Compresses the specified directory (`inputDir`) into the archive file at `outputPath`. Supported extensions: `.tar.gz`, `.zip`, `.7z` ([arXiv][3]).

### `extract(archivePath, destDir = '.')`

Extracts the given archive (`archivePath`) into `destDir` (defaults to current directory). Automatically detects and handles `.tar.gz`, `.zip`, and `.7z` formats ([arXiv][3]).

## Contributing

Contributions, bug reports, and feature requests are welcome via GitHub pull requests or issues:
[https://github.com/GitHub30/archiverjs/issues](https://github.com/GitHub30/archiverjs/issues) ([Bits and Pieces][2]).

## Deployment

Open GitHub Codespaces
```bash
npm adduser
npm publish --access public
```

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details ([docs.npmjs.com][1]).

[1]: https://docs.npmjs.com/about-package-readme-files/?utm_source=chatgpt.com "About package README files - npm Docs"
[2]: https://blog.bitsrc.io/writing-the-perfect-reademe-for-your-node-library-2d5f24dc1c06?utm_source=chatgpt.com "Writing the Perfect Readme for Your Node Library - Bits and Pieces"
[3]: https://arxiv.org/abs/1802.08391?utm_source=chatgpt.com "An Empirical Study on README contents for JavaScript Packages"
